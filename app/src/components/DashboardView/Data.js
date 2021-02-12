/* eslint-disable no-unused-vars */
import React, { useEffect, PureComponent } from "react";
import {
  makeStyles,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  NativeSelect,
  Container,
  MenuItem
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
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles(() => ({
  root: {},
  formControl: {
    backgroundColor: "#FFFFFF",
    margin:"1%",
    minWidth: 120,
  },
  lineChart:{
    display:"flex",
    justifyContent:"center",
    margin:"5%"
  }
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
  
  //State
  const [state, setState] = React.useState({
    selectedProject: "",
    selectedFile: "",
    projects:projectData || [],
    files:[],
    data:[]
  });

  const projHandleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    if(value === ""){
      setState({
        [name]:value,
        selectedFile: "",
        data:[]
      })
    }else{
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const fileHandleChange = (event) => {
   
    const name = event.target.name;
    const value = event.target.value;
    const project = state.selectedProject
    const data = projectData
    .filter((project)=>state.selectedProject === project.name)[0]
    .fileData
    .filter((file)=>value === file.fileName)[0]
    .data

    if(value === ""){
      setState({
        [name]:value,
        data:[]
      })
    }else{
      setState({
        ...state,
        [name]: value,
        data:data
      });
    }
  };

  return (
    <>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="selectedProject-native-simple">Project</InputLabel>
        <Select
          value={state.selectedProject}
          name="selectedProject"
          onChange={projHandleChange}
        >
          <MenuItem aria-label="None" value="" />
          {projectData &&
            projectData.map((x,index) => {
              return (
                <MenuItem key={index} value={x.name}>
                  {x.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      {
        state.selectedProject ? 
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="selectedProject-native-simple">File</InputLabel>
            <Select
              value={state.selectedFile}
              name="selectedFile"
              onChange={fileHandleChange}>
              <MenuItem aria-label="None" value="" />
              {projectData &&
                projectData
                  .filter((project) => project.name === state.selectedProject)
                  .map((file) => {
                    return file.fileData.map((x,index) => {
                      return <MenuItem key={index} value={x.fileName}>{x.fileName}</MenuItem>;
                    });
                  })}
            </Select>
          </FormControl>
        :null
      }
      
      <Container className={classes.lineChart} maxWidth="lg">
      {
        state.data.length !== 0?
        <ResponsiveContainer width="60%" height={300}>
            <LineChart
              data={state.selectedProject !== "" && state.selectedFile !== "" ? state.data : []}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="keyStrokes"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="minutes" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        :
      null
      }
      </Container>
      
      
    </>
  );
};

export default Data;
