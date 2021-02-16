import React from 'react';
import {
    makeStyles,
    Container,
    Grid
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root:{
        display:"flex",
        justifyContent:"center",
    },
    title:{
        color:"#05386B"
    },
    imgCont:{
        display:"flex",
        justifyContent:"center",
    },
    img:{
        height:"auto",
        width:"auto",
        marginBottom:"5%"
    }
  }));
 const File404 =() => {
    const classes = useStyles();
    return(
        <Container  max-width="lg">
            <Grid container>
                <Grid item className={classes.imgCont} xs={12}>
                <img className={classes.img} alt="404 page" src="/img/404image.jpeg"/>
                </Grid>
            </Grid>
            
                
            
        </Container>
    )
}

export default File404;