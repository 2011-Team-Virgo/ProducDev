/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  makeStyles,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  NativeSelect,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/user";

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

  const cleanData = (projects)=>{
    const result = []
    for (const [key, fileData] of Object.entries(projects)) {
      //key: projectNAme
      //fileData: fileData
      const projectData = {
        name:key,
        fileData:[]
      }
      for(const [key, value1] of Object.entries(fileData)){
        //key: filename
        //value1: timeStamp object {keystrokes, minutes}
        const file = {
          fileName: key,
          data:[]
        }
        for(const [key, value2] of Object.entries(value1)){
          const index = key.indexOf("_")
          const data = {
            date: key.slice(0,index),
            time: key.slice(index+1),
            keyStrokes: value2.keystrokes,
            minutes: value2.minutes
          }

          file.data.push(data);
        }
        projectData.fileData.push(file)
      }
      result.push(projectData)
    }
    return result
  }
  const projectData = cleanData(projects)
  console.log("project data", projectData)
  // to filter by project name
  const [state, setState] = React.useState({
    selectedProject: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      selectedProject: event.target.value,
    });
    console.log(state.selectedProject);
  };

  function objFilter(obj, predicate) {
    let result = {},
      key;

    for (key in obj) {
      if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
        result[key] = obj[key];
      }
    }

    return result;
  }

  // console.log(
  //   "obj filter ",
  //   objFilter(projects, (project) => project === state.selectedProject)
  // );

  function getData() {
    let result = [];
    let byFile = [];

    for (let x in projects) {
      for (let val of x) {
        result.push(val);
      }
    }
    return result;
  }

  console.log("get data ", getData());

  // const data = [
  //   {
  //     time: 2021-02-08,
  //     keystrokes: 500,
  //     minutes: 20,
  //   },
  // ]
  // ^^needs to be this format

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="selectedProject-native-simple">Project</InputLabel>
        <Select native value={state.selectedProject} onChange={handleChange}>
          <option aria-label="None" value="" />
          {projectNames &&
            projectNames.map((x) => {
              return <option value={x}>{x}</option>;
            })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Data;
