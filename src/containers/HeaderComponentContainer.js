import { connect } from 'react-redux';
import MainHeader from '../components/HeaderComponent';
import { setTableVisibleAction, getSearchResults, setSearchInput, setJobType, setfuncLevel, startAnalyse } from '../actions/AnalyserActions';
import { isDisableAnalyseBtn, getSearchInput } from '../selectors/TableAnalyserSelectors';


const mapStateToProps = state => {
    return {
        // isDisableAnalyseBtn: state.disableAnalyseBtn,
        // getSearchInput: state.searchInput
        //isDisableAnalyseBtn: isDisableAnalyseBtn(state),
        getSearchInput: getSearchInput(state),
        getLoaderVisible: state.isLoaderVisible,
        disableAnalyseBtn: state.disableAnalyseBtn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //   onTodoClick: id => {
        //     dispatch(toggleTodo(id))
        //   }
        startAnalyse: funcLevel => {
            dispatch(setJobType("analyse"));
            dispatch(setfuncLevel(funcLevel));
            dispatch(startAnalyse());
            //dispatch(getSearchResults(searchString));
        },
        setTableVisible: isTableVisible => {
            dispatch(setTableVisibleAction(isTableVisible));
            console.log("is table visible in container " + isTableVisible);
        },
        // disableAnalyseBtn: isDisableAnalyseBtn => {
        //     console.log("is table visible in container " + isDisableAnalyseBtn);
        // },
        setSearchInput: searchInput => {
            dispatch(setSearchInput(searchInput));
        },
        getTableResults: level => {
            dispatch(setJobType("search"));
            dispatch(getSearchResults(level));
        }
    }
}

const HeaderComponentContainer = connect(mapStateToProps, mapDispatchToProps)(MainHeader)

export default HeaderComponentContainer;
