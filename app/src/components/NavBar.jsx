import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from "@material-ui/icons/BarChart";
import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold"
  },
  navbar: {
    color: "#05386B",
    backgroundColor:"transparent"
  },
  link: {
    color: "#05386B",
    textDecoration: "none"
  },
  linkRoutes: {
    flexGrow: 1,
    justifyContent: "flex-start"
  }
}));

const NavBar = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.userState.user) || {};

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.navbar}>
        <Toolbar className={classes.navbar}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              ProducDev
            </Link>
          </Typography>
          {user.id ? (
            <div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}>
                <BarChartIcon onClick={() => handleMenuClick("/analytics")} />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}>
                <Avatar
                  onClick={() => handleMenuClick("/account")}
                  alt={user.displayName}
                  src={user.photoURL}
                />
              </IconButton>
            </div>
          ) : (
            <Link to="/signin" className={classes.link}>
              Sign in
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
