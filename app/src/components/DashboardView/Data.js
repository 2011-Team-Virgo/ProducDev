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

const Data = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, userData } = useSelector((state) => state.userState);

  //user and userData
  const { projects } = userData || {};

  useEffect(() => {
    const data = user ? dispatch(fetchUserData(user.id)) : null;
  }, [dispatch]);

  const projectNames = projects ? Object.keys(projects) : [];

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

  console.log(projects);

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
