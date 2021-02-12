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

  const projectNames = projects ? Object.keys(projects) : [];
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
                file.fileData.map((x) => {
                  return <option value={x.fileName}>{x.fileName}</option>;
                });
              })}
        </Select>
      </FormControl>
    </div>
  );
};

const Chart = () => {
  return (
    <LineChart
      width={500}
      height={300}
      // data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Data;
