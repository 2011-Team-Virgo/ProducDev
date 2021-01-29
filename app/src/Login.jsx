import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#B19F9E',
    color: '#FEFFFF',
    '&:hover': {
      opacity: '0.6',
    },
  },
  button: {
    backgroundColor: '#479761',
    color: '#f5f5f5',
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { handleSubmit } = props;
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
