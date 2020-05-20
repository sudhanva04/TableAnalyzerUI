import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { btnOvrride } from './layout.css';
import MainHeader from './HeaderComponent';
import HeaderComponentContainer from '../containers/HeaderComponentContainer';
import DatatableComponent from './DataTableComponent';
import DataTableDuplicate from './DatatableDuplicate';
import DataTableComponentContainer from '../containers/DataTableComponentContainer';
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
        <div className={classes.root}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                    {/* <Paper className={classes.paper}>xs=12</Paper> */}
                    {/* <MainHeader isTableVisible = {props.isTableVisible} setTableVisible = {props.setTableVisible}/> */}
                    <HeaderComponentContainer />
                </Grid>
                <Grid item xs={12}>
                    {/* <Paper className={classes.paper}>xs=6</Paper> */}
                    {/*props.isTableVisible && <DatatableComponent /> */}
                    <DataTableComponentContainer />
                </Grid>
                {/* <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid> */}
            </Grid>
        </div>
    );
};

//export default App;
//<button className={btnOvrride}>Hello World</button>
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