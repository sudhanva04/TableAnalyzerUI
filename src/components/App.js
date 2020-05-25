import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import HeaderComponentContainer from '../containers/HeaderComponentContainer';

import DataTableComponentContainer from '../containers/DataTableComponentContainer';
import LeftNavComponent from './LeftNavComponent';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const AppView = (props) => {
    const classes = useStyles();
    return (
        // <div className={classes.root}>
        //     <Grid container spacing={3} alignItems="center">
        //         <Grid item xs={12}>
        //             <HeaderComponentContainer />
        //         </Grid>
        //         <Grid item xs={12}>
        //             <DataTableComponentContainer />
        //         </Grid>
        //     </Grid>
        // </div>
        <div><LeftNavComponent /></div>
    );
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isTableVisible: false, setTablevisible: this.setTableVisible };
    }
    setTableVisible() {
        this.setState({ isTableVisible: true })
    }
    render() {
        return (<AppView isTableVisible={this.state.isTableVisible} setTableVisible={this.state.setTablevisible.bind(this)} />);
    }
}
export default App;