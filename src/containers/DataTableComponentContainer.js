import { connect } from 'react-redux';
import DatatableComponent from '../components/DataTableComponent';
import {dataTableSelector, isTableVisible}  from '../selectors/TableAnalyserSelectors';

const mapStateToProps = state => {
    return {
        tableData: dataTableSelector(state),
        isTableVisible: isTableVisible(state),
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         //   onTodoClick: id => {
//         //     dispatch(toggleTodo(id))
//         //   }
//         startAnalyse: searchString => {
//             dispatch(getSearchResults(searchString));
//         },
//         setTableVisible: isTableVisible => {
//             dispatch(setTableVisibleAction(isTableVisible));
//             console.log("is table visible in container " + isTableVisible);
//         },
//         disableAnalyseBtn: isDisableAnalyseBtn => {
//             console.log("is table visible in container " + isDisableAnalyseBtn);
//         },
//         setSearchInput: searchInput => {
//             dispatch(setSearchInput(searchInput));
//         }

//     }
// }

const mapDispatchToProps = dispatch => {
    return {}
}


const DataTableComponentContainer = connect(mapStateToProps, mapDispatchToProps)(DatatableComponent)

export default DataTableComponentContainer;