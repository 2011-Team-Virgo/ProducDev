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
  MenuItem,
  Grid,
  Paper,
  Button,
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
    margin: "1%",
    minWidth: 120,
  },
  lineChart: {
    display: "flex",
    justifyContent: "start",
    margin: "5%",
  },
  paper: {
    "&:hover": {
      opacity: "0.6",
    },
    color: "#f7ebe8",
    padding: "3px",
    margin: "5px",
    backgroundColor: "transparent",
    border: [[1, "solid", "#2ec4b6"]],
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

  //State
  const [state, setState] = React.useState({
    selectedProject: "",
    selectedFile: "",
    projects: projectData || [],
    files: [],
    data: [],
  });

  const projHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (value === "") {
      setState({
        [name]: value,
        selectedFile: "",
        data: [],
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const fileHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const project = state.selectedProject;
    const data = projectData
      .filter((project) => state.selectedProject === project.name)[0]
      .fileData.filter((file) => value === file.fileName)[0].data;

    if (value === "") {
      setState({
        [name]: value,
        data: [],
      });
    } else {
      setState({
        ...state,
        [name]: value,
        data: data,
      });
    }
  };

  //if no project is selected, renders all data:
  const allProjects = (arr) => {
    let allProjects = [];
    arr.map((elem) => {
      return elem.fileData.map((e) => {
        return e.data.map((x) => {
          return allProjects.push(x);
        });
      });
    });
    return allProjects;
  };

  const allTime = () => {
    let keys = 0;
    projectData && allProjects(projectData).map((x) => (keys += x.keyStrokes));

    let minutes = 0;
    projectData && allProjects(projectData).map((x) => (minutes += x.minutes));

    return `Since using ProducDev, you have made ${keys} keystrokes and coded for ${minutes} minutes`;
  };

  const dayOfWeek = () => {
    let days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
      Saturday: 5,
      Sunday: 6,
    };
    let monMins = 0;
    let monday =
      projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date).getDay() === 0)
        .map((x) => (monMins += x.minutes));
    days.Monday = monMins;

    let tuesMins = 0;
    let tuesday =
      projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date).getDay() === 1)
        .map((x) => (tuesMins += x.minutes));
    days.Tuesday = tuesMins;

    let wedMins = 0;
    let wednesday =
      projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date).getDay() === 2)
        .map((x) => (wedMins += x.minutes));
    days.Wednesday = wedMins;

    let thursMins = 0;
    let thursday =
      projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date).getDay() === 3)
        .map((x) => (thursMins += x.minutes));
    days.Thursday = thursMins;

    let friMins = 0;
    let friday =
      projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date).getDay() === 4)
        .map((x) => (friMins += x.minutes));
    days.Friday = friMins;

    let satMins = 0;
    let saturday =
      projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date).getDay() === 5)
        .map((x) => (satMins += x.minutes));
    days.Saturday = satMins;

    let sunMins = 0;
    let sunday =
      projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date).getDay() === 6)
        .map((x) => (sunMins += x.minutes));
    days.Sunday = sunMins;

    let maxDay = Object.keys(days).reduce((a, b) =>
      days[a] > days[b] ? a : b
    );
    return `Your most productive day of the week is ${maxDay}`;
  };

  const thirtyDays = () => {
    let thirtyDays = new Date();
    thirtyDays.setDate(thirtyDays.getDate() - 30);

    let keys = 0;
    let minutes = 0;

    projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date) >= thirtyDays)
        .map((x) => (keys += x.keyStrokes));

    projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date) >= thirtyDays)
        .map((x) => (minutes += x.minutes));

    return `In the past 30 days, you've made a total of ${keys} keystrokes and coded ${minutes} minutes`;
  };

  const thisWeek = () => {
    let thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 14);
    let keys = 0;
    let minutes = 0;
    projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date) >= thisWeek)
        .map((x) => (keys += x.keyStrokes));
    projectData &&
      allProjects(projectData)
        .filter((x) => new Date(x.date) >= thisWeek)
        .map((x) => (minutes += x.minutes));

    let lastKeys = 0;
    let lastMins = 0;
    projectData &&
      allProjects(projectData)
        .filter(
          (x) => new Date(x.date) >= lastWeek && new Date(x.date) < thisWeek
        )
        .map((x) => (lastKeys += x.keyStrokes));

    projectData &&
      allProjects(projectData)
        .filter(
          (x) => new Date(x.date) >= lastWeek && new Date(x.date) < thisWeek
        )
        .map((x) => (lastMins += x.minutes));

    let keyDelta = (((keys - lastKeys) / lastKeys) * 100).toFixed(0);
    let minDelta = (((minutes - lastMins) / lastMins) * 100).toFixed(0);

    return keys >= lastKeys && minutes >= lastMins
      ? `This week, your keystrokes were up ${keyDelta}% and your coding time was up ${minDelta}% compared to last week`
      : keys >= lastKeys && minutes < lastMins
      ? `This week, your keystrokes were up ${keyDelta}% and your coding time dropped ${minDelta}% compared to last week`
      : keys < lastKeys && minutes >= lastMins
      ? `This week, your keystrokes were down ${keyDelta}% and your coding time is up ${minDelta}% compared to last week`
      : `This week, your keystrokes are down ${keyDelta}% and your coding time has dropped ${minDelta}% compared to last week`;
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
            projectData.map((x, index) => {
              return (
                <MenuItem key={index} value={x.name}>
                  {x.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      {state.selectedProject ? (
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="selectedProject-native-simple">File</InputLabel>
          <Select
            value={state.selectedFile}
            name="selectedFile"
            onChange={fileHandleChange}
          >
            <MenuItem aria-label="None" value="" />
            {projectData &&
              projectData
                .filter((project) => project.name === state.selectedProject)
                .map((file) => {
                  return file.fileData.map((x, index) => {
                    return (
                      <MenuItem key={index} value={x.fileName}>
                        {x.fileName}
                      </MenuItem>
                    );
                  });
                })}
          </Select>
        </FormControl>
      ) : null}
      <Container className={classes.lineChart}>
        {state.data.length !== 0 ? (
          <ResponsiveContainer>
            <LineChart
              data={
                state.selectedProject !== "" && state.selectedFile !== ""
                  ? state.data
                  : []
              }
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
                dataKey="keyStrokes"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="minutes" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        ) : null}
      </Container>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <span className={classes.summary}>
              <ul>
                <li>{allTime()}</li>
                <li>{thirtyDays()}</li>
                <li>{thisWeek()}</li>
                <li>{dayOfWeek()}</li>
              </ul>
            </span>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Data;
