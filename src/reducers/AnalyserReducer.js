const initialState = {
    //visibilityFilter: VisibilityFilters.SHOW_ALL,
    disableAnalyseBtn: true,
    isTableVisible: false,
    searchInput: '',
    searchResults: null,
    rowsList: [],
    headerList: [],
    jobId: null,
    jobStatus: null,
    funcLevel: null,
    jobType: 'search',
    scriptResponse: null,
    isLoaderVisible: false
}

const AnalyserReducer = (state = initialState, action) => {
    // if (typeof state === 'undefined') {
    //     return initialState
    // }
    switch (action.type) {
        case 'SET_TABLE_VISIBLE':
            return Object.assign({}, state, {
                ...state,
                isTableVisible: action.payload
            })
            break;
        case 'SET_SEARCH_INPUT':
            return Object.assign({}, state, {
                ...state,
                searchInput: action.payload
            })
            break;
        case 'SET_SEARCH_RESULT':
            return Object.assign({}, state, {
                ...state,
                searchResults: action.payload
            })
            break;
        case 'SET_JOB_TYPE':
            return Object.assign({}, state, {
                ...state,
                jobType: action.payload
            })
            break;
        case 'SET_FUNC_LEVEL':
            return Object.assign({}, state, {
                ...state,
                funcLevel: action.payload
            })
            break;
        case 'SET_SCRIPT_RESPONSE':
            return Object.assign({}, state, {
                ...state,
                scriptResponse: action.payload
            })
            break;
            case 'SET_LOADER_VISIBLE':
            return Object.assign({}, state, {
                ...state,
                isLoaderVisible: action.payload
            })
            break;
            case 'DISABLE_ANALYSE_BUTTON':
            return Object.assign({}, state, {
                ...state,
                disableAnalyseBtn: action.payload
            })
            break;
        default:
            return state
            break;
    }

    return state;
}

export default AnalyserReducer;