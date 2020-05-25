import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function createData(name, calories, fat, carbs, protein, dag, sqlfile, timestamp) {
    return { name, calories, fat, carbs, protein, dag, sqlfile, timestamp };
}

// const rows = [
//     createData(1, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(2, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(3, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(4, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(5, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(6, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(7, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(8, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(9, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(10, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(11, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(12, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
//     createData(13, 'Cupcake', 'Apple', 'Chinese quince', 'Cocky apple', 'Eastern mayhaw', 'Chokeberry', '05-05-2020'),
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// const headCells = [
//     { id: 'name', numeric: true, disablePadding: false, label: 'Sl no' },
//     { id: 'calories', numeric: false, disablePadding: false, label: 'Project' },
//     { id: 'fat', numeric: false, disablePadding: false, label: 'Schema' },
//     { id: 'carbs', numeric: false, disablePadding: false, label: 'Table' },
//     { id: 'protein', numeric: false, disablePadding: false, label: 'Component Type' },
//     { id: 'dag', numeric: false, disablePadding: false, label: 'Dag' },
//     { id: 'sqlfile', numeric: false, disablePadding: false, label: 'Sql file' },
//     { id: 'timestamp', numeric: false, disablePadding: false, label: 'TimeStamp' }
// ];

const createHeadCells = headcells => {
    let headers = [];
    headcells.forEach(head => {
        var headObj = {}
        headObj.id = head;
        headObj.numeric = false;
        headObj.disablePadding = false;
        headObj.label = head;
        if (head == 'Sl no') {
            headObj.numeric = true;
        }
        headers.push(headObj);
    });
    return headers;
}

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.theadColor}>
            <TableRow>
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell> */}
                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        //align={headCell.numeric ? 'right' : 'left'}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    typographyRoot: {
        width: '100%',
        maxWidth: 500,
    }
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {'Results for Function Level: '+props.funcLevel}
                    </Typography>
                )}

            {/* {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )} */}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    messageStyle: {
        textAlign: 'center',
        color: 'maroon'
    },
    theadColor: {
        backgroundColor: 'whitesmoke'
    }
}));

const DatatableComponent = (props) => {
    if (!props.tableData || !props.tableData.dataList || !props.tableData.dataList.tableData)
        return null;
    const rows = props.tableData.dataList.tableData;
    const headCells = createHeadCells(props.tableData.tableHeaders.headers);
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        // if (event.target.checked) {
        //     const newSelecteds = rows.map((n) => n.name);
        //     setSelected(newSelecteds);
        //     return;
        // }
        // setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        props.isTableVisible && props.tableData.status != 'Error' ?
            <div className={classes.root}>
                {rows.length > 0 ? <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} funcLevel={props.funcLevel}/>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}
                            />
                            {rows.length > 0 &&
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    //onClick={(event) => handleClick(event, row.name)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.slno}
                                                    selected={isItemSelected}
                                                >
                                                    {/* <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell> */}
                                                    {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell> */}
                                                    <TableCell align="left">{row.slno}</TableCell>
                                                    <TableCell align="left">{row.project}</TableCell>
                                                    <TableCell align="left">{row.schema}</TableCell>
                                                    <TableCell align="left">{row.table}</TableCell>
                                                    <TableCell align="left">{row.componentType}</TableCell>
                                                    <TableCell align="left">{row.dagPath == 'NA' ? row.dagPath :
                                                        <a href={row.dagPath} style={{ display: "table-cell" }} target="_blank">{row.dagFile}</a>}
                                                    </TableCell>
                                                    <Tooltip title={'path/' + row.sqlFilePath}>
                                                        <TableCell align="left">
                                                            {row.sqlFilePath == 'NA' ? row.sqlFilePath :
                                                                <a href={row.sqlFilePath} style={{ display: "table-cell" }} target="_blank">{row.sqlFile}</a>}
                                                        </TableCell>
                                                    </Tooltip>
                                                    <TableCell align="left">{row.timeStamp}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper> :
                    //     <div className={classes.messageStyle}><Typography className={classes.typographyRoot} variant="h4.Heading" component="h2" gutterBottom>
                    //         No data to display
                    //   </Typography></div>
                    <div><h2 className={classes.messageStyle}> No data to display</h2></div>
                }
                {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
            </div> : props.tableData.status.includes('Error') && <div><h2 className={classes.messageStyle}> Error in fetching data</h2></div>

    );

}

DatatableComponent.propTypes = {
    tableData: PropTypes.object,
    isTableVisible: PropTypes.bool,
    funcLevel: PropTypes.number
}

export default DatatableComponent;