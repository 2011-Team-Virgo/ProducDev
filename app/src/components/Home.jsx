import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../colors";
import {
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useMediaQuery } from "@material-ui/core";
import { AutorenewTwoTone } from "@material-ui/icons";

const { red, darkBlue, lightBlue } = colors;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E54B4B",
    color: "#F7EBE8",
    borderRadius: "20px",
    margin: "10px",
  },
  graph: {
    margin: "10px",
    padding: "10px",
    height: "65vh",
    width: "80vw",
  },
  formControl: {
    backgroundColor: "#FFFFFF",
    margin: "1%",
    minWidth: 120,
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "transparent",
    boxShadow: "7px",
    color: "#F7EBE8",
    padding: "5px",
  },
}));

const mobileStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const data = () => {
  let result = [];
  for (let i = 1; i < 29; i++) {
    let obj = {
      project: "Alpha",
      date: new Date(2021, 1, i).toDateString().slice(4),
      keyStrokes: Math.floor(Math.random() * 500) + 500,
      minutes: Math.floor(Math.random() * 500) + 30,
    };
    result.push(obj);
  }
  for (let i = 1; i < 29; i++) {
    let obj = {
      project: "Bravo",
      date: new Date(2021, 1, i).toDateString().slice(4),
      keyStrokes: Math.floor(Math.random() * 500) + 500,
      minutes: Math.floor(Math.random() * 500) + 30,
    };
    result.push(obj);
  }
  for (let i = 1; i < 29; i++) {
    let obj = {
      project: "Delta",
      date: new Date(2021, 1, i).toDateString().slice(4),
      keyStrokes: Math.floor(Math.random() * 500) + 500,
      minutes: Math.floor(Math.random() * 500) + 30,
    };
    result.push(obj);
  }
  return result;
};

const Home = () => {
  const clickHandler = (e) => {
    window.open(
      "https://marketplace.visualstudio.com/items?itemName=fsa-producdev.producdev",
      "_blank"
    );
  };
  const classes = useStyles();
  const mobileClasses = mobileStyles();

  const isTablet = useMediaQuery("(max-width: 1024px)");

  const [state, setState] = React.useState({
    project: "",
  });

  const handleChange = (event) => {
    // eslint-disable-next-line no-restricted-globals
    const value = event.target.value;
    setState({
      project: value,
    });
  };

  return (
    <div
      id="mainContent"
      className={isTablet ? mobileClasses.root : classes.root}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h5>
              ProducDev is a tool that helps developers quantify their
              productivity
            </h5>
            <h6>
              ProducDev works behind the scenes to keep track of your critical
              metrics while you code. When the time comes to prepare for your
              next performance review or job interview, review your analytics
              here, to quanitfy and highlight your contributions.
            </h6>
            <Button className={classes.button} onClick={clickHandler}>
              Get the extension
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="project-native-simple">
                Select Project
              </InputLabel>
              <Select
                value={state.project}
                name="project"
                onChange={handleChange}
              >
                <MenuItem value="Alpha">Alpha</MenuItem>
                <MenuItem value="Bravo">Bravo</MenuItem>
                <MenuItem value="Delta">Delta</MenuItem>
              </Select>
            </FormControl>
            <span>
              <h5>Select a project to see how it works</h5>
            </span>
            <LineChart
              width={500}
              height={300}
              data={data().filter((x) => x.project === state.project)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[100, 1000]} />
              <YAxis orientation="right" domain={[0, 480]} />
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Home);
