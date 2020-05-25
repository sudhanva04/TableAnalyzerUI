import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    boxStyle: {
        fontSize: '26px',
        // height: '60px',
        // textAlign: 'center',
        marginLeft: '575px'
    },
    imgStyle: {
        marginTop: '160px',
        /* left: 45px; */
        marginLeft: '540px',
        height: '250px'
    }
}));


const WorkInProgressComponent = () => {
    const classes = useStyles();
    return (<div><div> <Typography variant="h6" noWrap className={classes.boxStyle}>
        Under Construction
</Typography></div>
        <div><img className={classes.imgStyle} src="../../resources/UnderConstruction.webp" /></div></div>)
}

export default WorkInProgressComponent;