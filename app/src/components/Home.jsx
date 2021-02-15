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

const { red, darkBlue, lightBlue } = colors;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    margin: "10px",
  },
  button: {
    display: "flex",
    alignSelf: "center",
    height: "37px",
    width: "100px",
    backgroundColor: red,
    border: "none",
    borderRadius: "2em",
    outline: "none",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid" + darkBlue,
    },
    "&:active": {
      backgroundColor: lightBlue,
      border: "none",
    },
  },
  words: {
    textAlign: "center",
    margin: "8vh",
  },
  graph: {
    margin: "10px",
    padding: "10px",
    height: "65vh",
    width: "80vw",
  },
}));

const mobileStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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

  return (
    <div
      id="mainContent"
      className={isTablet ? mobileClasses.root : classes.root}
    >
      <div className={classes.info}>
        <p className={classes.words}>
          ProducDev is an extension built to track various metrics of your
          productivity within VSCode.
        </p>
        <button
          className={classes.button}
          onClick={clickHandler}
          alt="click to get the extension"
        >
          Get the Extension
        </button>
      </div>
      {/* <FormControl variant="filled" className={classes.formControl}>
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
      </FormControl> */}
      <LineChart
        width={500}
        height={300}
        data={data}
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
    </div>
  );
};

export default withRouter(Home);
