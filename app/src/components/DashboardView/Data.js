/* eslint-disable no-unused-vars */
import React, { useEffect, PureComponent } from "react";
import {
  makeStyles,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  NativeSelect,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/user.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const useStyles = makeStyles(() => ({
  root: {},
  formControl: {
    backgroundColor: "#FFFFFF",
  },
}));

const Data = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, userData } = useSelector((state) => state.userState);
  //user and userData
  const { projects } = userData || {};

  const cleanData = (projects) => {
    const result = [];
    for (const [key, fileData] of Object.entries(projects)) {
      //key: projectNAme
      //fileData: fileData
      const projectData = {
        name: key,
        fileData: [],
      };
      for (const [key, value1] of Object.entries(fileData)) {
        //key: filename
        //value1: timeStamp object {keystrokes, minutes}
        const file = {
          fileName: key,
          data: [],
        };
        for (const [key, value2] of Object.entries(value1)) {
          const index = key.indexOf("_");
          const data = {
            date: key.slice(0, index),
            time: key.slice(index + 1),
            keyStrokes: value2.keystrokes,
            minutes: value2.minutes,
          };

          file.data.push(data);
        }
        projectData.fileData.push(file);
      }
      result.push(projectData);
    }
    return result;
  };
  const projectData = projects && cleanData(projects);

  // to filter by project name
  const [state, setState] = React.useState({
    selectedProject: "",
    selectedFile: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  //if no project is selected, renders all data:
  const allProjects = (arr) => {
    let allProjects = [];
    if (state.selectedProject === "") {
      arr.map((elem) => {
        return elem.fileData.map((e) => {
          return e.data.map((x) => {
            return allProjects.push(x);
          });
        });
      });
      return allProjects;
    } else {
      return [];
    }
  };

  //if a project is selected but a file is not:
  const allFilesData = (arr) => {
    let allFiles = [];
    let intervals = [];
    if (state.selectedProject !== "") {
      arr
        .filter((project) => {
          return project.name === state.selectedProject;
        })
        .map((file) => {
          return allFiles.push(file.fileData);
        });
      allFiles.map((elem) => {
        return intervals.push(elem[0].data);
      });

      return intervals[0];
    } else return [];
  };

  //if a project and a file are both selected:
  const singleFileData = (arr) => {
    let singleFile = [];
    let selected = [];
    if (state.selectedProject !== "" && state.selectedFile !== "") {
      arr
        .filter((project) => {
          return project.name === state.selectedProject;
        })
        .map((elem) => {
          return selected.push(elem.fileData);
        });

      selected.filter((elem) => {
        return elem.fileName === state.selectedFile;
      });
      return selected[0][0].data;
    } else return [];
  };

  const chartData = (arr) => {
    if (state.selectedProject === "") return allProjects(arr);
    if (state.selectedProject !== "" && state.selectedFile === "")
      return allFilesData(arr);
    if (state.selectedProject !== "" && state.selectedFile !== "")
      return singleFileData(arr);
    else return [];
  };

  console.log("chart data ", chartData(projectData));

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="selectedProject-native-simple">Project</InputLabel>
        <Select
          native
          value={state.selectedProject}
          name="selectedProject"
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          {projectData &&
            projectData.map((x) => {
              return (
                <option key={x.time} value={x.name}>
                  {x.name}
                </option>
              );
            })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="selectedProject-native-simple">File</InputLabel>
        <Select
          native
          value={state.selectedFile}
          name="selectedFile"
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          {projectData &&
            projectData
              .filter((project) => project.name === state.selectedProject)
              .map((file) => {
                return file.fileData.map((x) => {
                  return <option value={x.fileName}>{x.fileName}</option>;
                });
              })}
        </Select>
      </FormControl>
      <LineChart
        width={500}
        height={300}
        data={chartData(projectData)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="keystrokes"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="minutes" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Data;
