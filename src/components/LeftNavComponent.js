
import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';

import HeaderComponentContainer from '../containers/HeaderComponentContainer';

import DataTableComponentContainer from '../containers/DataTableComponentContainer';

import WorkInProgressComponent from './WorkInProgressComponent';

const drawerWidth = 240;

const logoPoints = '18.6668189 0.266110177 14.2818403 13.7780586 0 13.7780586 11.5696607 22.1763713 7.18734246 35.6925762 18.6492609 27.3299116 30.1792831 35.7319487 25.7738202 22.1540247 37.2926691 13.7780586 23.056586 13.7780586';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    contentRoot: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    boxStyle: {
        fontSize: '26px',
        // height: '60px',
        // textAlign: 'center',
        marginLeft: '257px'
    },
    titleBarColor: {
        backgroundColor: "#e01a2b"
    },
    sideMenu: {
        backgroundColor: "whitesmoke"
    }
}));

const LeftNavRender = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderQueryComponent = () => {
        console.log('feature.....'+props.feature);
        return (<Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
                <HeaderComponentContainer />
            </Grid>
            <Grid item xs={12}>
                <DataTableComponentContainer />
            </Grid>
        </Grid>);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={`${clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })} ${classes.titleBarColor}`}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <svg height="42px">
                        <polygon id="Fill-15" fill="whitesmoke" points={logoPoints}></polygon>
                    </svg>
                    <Typography variant="h6" noWrap className={classes.boxStyle}>
                        Big Query Analysis Tool
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List className={classes.sideMenu}>
                    {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))} */}
                    <ListItem button onClick={() => {props.setFeature('query')}} key={"Query"}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={"Query"} />
                    </ListItem>
                    <ListItem button onClick={() => {props.setFeature('notWuery')}} key={"Feature 2"}>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary={"Feature 2"} />
                    </ListItem>
                    <ListItem onClick={() => {props.setFeature('notWuery')}} button key={"Feature 3"}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={"Feature 3"} />
                    </ListItem>
                </List>
                <Divider />
                {/* <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.contentRoot}>
                    {/* <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12}>
                            <HeaderComponentContainer />
                        </Grid>
                        <Grid item xs={12}>
                            <DataTableComponentContainer />
                        </Grid>
                    </Grid> */}
                    {props.feature == 'query' ? renderQueryComponent() :
                        <WorkInProgressComponent />}

                </div>
            </main>
        </div>
    );
}


class LeftNavComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { feature: "query" };
        this.setFeature = this.setFeature.bind(this)
    }

    setFeature = (feature) => {
        this.setState({
            feature: feature
        });
    }

    render() {
        return (<div><LeftNavRender feature={this.state.feature} setFeature={this.setFeature} /></div>);
    }

}
export default LeftNavComponent;