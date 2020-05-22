import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    txtFieldStyle: {
        width: '235px',
        color: '#696969'
    },
    btnStyle: {
        color: 'white',
        backgroundColor: 'rgb(255,26,43)'
    },
    btnStyleDisabled: {
        color: 'white',
        background: 'grey'
    },
    boxStyle: {
        fontSize: '30px',
        height: '60px',
        textAlign: 'center',
    },
    containerStyle: {
        padding: '30px'
    }
}));

const HeaderView = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        props.setJobType("analyse");
        setOpen(true);
    };

    const handleClose = (level) => {
        setOpen(false);
        if (props.jobType == "search") {
            props.setJobType("search");
            props.getTableResults(level);
        } else if (props.jobType == "analyse") { props.startAnalyse(level) }

    };

    const handleAgree = () => {
        handleClose();
        props.seLoaderTrue();
    }

    const getTableResults = () => {
        // if (!props.isTableVisible) {
        // props.setJobType("search");
        // props.getTableResults(props.getSearchInput);
        props.setJobType("search");
        setOpen(true);
        // }
    }

    const setInput = e => {
        props.setSearchInput(e.target.value);
        //        console.log('ip val '+ e.target.value);
    }

    const classes = useStyles();
    return <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" className={classes.containerStyle}>
            <Grid item xs={12}>
                <div display="inline" p={1} m={1} bgcolor="background.paper" className={classes.boxStyle}>
                    Big Query Analysis Tool
                </div>
            </Grid>
            <Grid item xs={2}>
                <TextField id="input-with-icon-grid" label="Enter table name" className={classes.txtFieldStyle} value={props.getSearchInput} onChange={setInput} />
            </Grid>
            <Grid item xs={7}>
                {/* <SearchIcon /> */}
                <Button variant="outlined" className={classes.btnStyle} onClick={getTableResults}>
                    Search
        </Button>
            </Grid>
            <Grid item xs={2}> {props.disableAnalyseBtn == false ?
                <Button variant="outlined"
                    className={classes.btnStyle} onClick={handleClickOpen}>
                    Analyze Now
                </Button> :
                <Button variant="contained" disabled>
                    Analyze Now disabled
                </Button>}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Search Level"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please choose the analysis level
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Grid container spacing={1} justify="center" className={classes.containerStyle}>
                            <Grid item xs={12}>
                                <div>
                                    <Button onClick={() => { handleClose(1) }} variant="outlined" className={classes.btnStyle}>
                                        Table
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div >
                                    <Button onClick={() => { handleClose(2) }} variant="outlined" className={classes.btnStyle}>
                                        SQL Script
                                </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <Button onClick={() => { handleClose(3) }} variant="outlined" className={classes.btnStyle}>
                                        Python Script
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid item xs={1}>
                {props.getLoaderVisible && <CircularProgress />}
            </Grid>
        </Grid>
    </div>
}




//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open alert dialog
//       </Button>

//     </div>
//   );


//const MainHeader = () => {
class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jobType: "search" };
        this.setJobType = this.setJobType.bind(this)
    }
    seLoaderTrue() {
        this.setState({
            isLoaderVisible: true
        });
        setTimeout(() => {
            this.setState({
                isLoaderVisible: false
            });
            // if (!this.props.isTableVisible) {
            //     this.props.setTableVisible();
            // }
        }, 10 * 1000);
    }

    setJobType = (jt) => {
        this.setState({
            jobType: jt
        });
    }
    render() {
        return (<div><HeaderView loaderVisible={this.state.isLoaderVisible}
            startAnalyse={this.props.startAnalyse} setSearchInput={this.props.setSearchInput}
            getSearchInput={this.props.getSearchInput} getTableResults={this.props.getTableResults}
            getLoaderVisible={this.props.getLoaderVisible}
            disableAnalyseBtn={this.props.disableAnalyseBtn}
            jobType={this.state.jobType} setJobType={this.setJobType} /> </div >);
    }
};

MainHeader.propTypes = {
    startAnalyse: PropTypes.func,
    setSearchInput: PropTypes.func,
    getSearchInput: PropTypes.string,
    getTableResults: PropTypes.func,
    getLoaderVisible: PropTypes.bool,
    disableAnalyseBtn: PropTypes.bool
}

export default MainHeader;