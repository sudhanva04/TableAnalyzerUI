import axios from "axios";


export const setTableVisibleAction = isTableVisible => ({
    type: 'SET_TABLE_VISIBLE',
    payload: isTableVisible
})

export const setSearchInput = searchInput => ({
    type: 'SET_SEARCH_INPUT',
    payload: searchInput
})

export const setSearchResult = res => ({
    type: 'SET_SEARCH_RESULT',
    payload: res
})

export const setJobType = jobType => ({
    type: 'SET_JOB_TYPE',
    payload: jobType
})

export const setfuncLevel = funcLevel => ({
    type: 'SET_FUNC_LEVEL',
    payload: funcLevel
})

export const setScriptResponse = res => ({
    type: 'SET_SCRIPT_RESPONSE',
    payload: res
})

export const setLoaderVisible = res => ({
    type: 'SET_LOADER_VISIBLE',
    payload: res
})

export const disableAnalyseButton = res => ({
    type: 'DISABLE_ANALYSE_BUTTON',
    payload: res
})

export const getSearchResults = level => {
    return (dispatch, getState) => {
        const state = getState();
        const searchKey = state.searchInput;
        const jobId = state.jobId;
        const funcLevel = state.funcLevel;
        //const jobType = state.jobType;
        let config = {
            headers: {
                Accept: 'application/json',
            }
        }
        //http://localhost:8083/analyser/analyse/tableResults?searchKey=DATE&funcLevel=2&jobId=hhrtsjhjd567
        let url = '';
        url = 'http://localhost:8083/analyser/analyse/tableResults?searchKey=' + searchKey + '&funcLevel=' + level;
        axios
            // .get('http://localhost:8083/analyser/analyse', {
            .get(url, {
                mode: 'no-cors',
                headers: {
                    //'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                //credentials: 'same-origin'
            })
            .then(res => {
                console.log(JSON.stringify(res.data));
                dispatch(setSearchResult(res.data));
                dispatch(setTableVisibleAction(true));
            })
            .catch(err => {
                console.log("Error in search result call api call!!!");
                dispatch(setTableVisibleAction(false));
                // dispatch(addTodoFailure(err.message));
            });
    }
}

export const startAnalyse = () => {
    return (dispatch, getState) => {
        const state = getState();
        let searchKey = state.searchInput;
        let funcLevel = state.funcLevel;
        let config = {
            headers: {
                Accept: 'application/json',
            }
        }
        let url = 'http://localhost:8083/analyser/analyse/startScript?searchKey=' + searchKey + '&funcLevel=' + funcLevel;
        dispatch(setLoaderVisible(true));
        dispatch(disableAnalyseButton(true));
        axios
            // .get('http://localhost:8083/analyser/analyse', {
            .get(url, {
                mode: 'no-cors',
                headers: {
                    //'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                //credentials: 'same-origin'
            })
            .then(res => {
                console.log(JSON.stringify(res.data));
                dispatch(setScriptResponse(res.data));
                let status = res.data.status;
                funcLevel = res.data.funcLevel;
                const jobId = res.data.jobId;
                searchKey = res.data.searchString;
                if (status != 'COMPLETED' && status != 'FAILED') {
                    var interval = setInterval(() => {
                        url = 'http://localhost:8083/analyser/analyse/tableResultsWithJobId?searchKey=' + searchKey + '&funcLevel=' + funcLevel + '&jobId=' + jobId
                        axios
                            // .get('http://localhost:8083/analyser/analyse', {
                            .get(url, {
                                mode: 'no-cors',
                                headers: {
                                    //'Access-Control-Allow-Origin': '*',
                                    'Content-Type': 'application/json',
                                },
                                //credentials: 'same-origin'
                            })
                            .then(resp => {
                                //console.log(JSON.stringify(res.data));
                                let status = resp.data.status.split(":");
                                if (status[0] == 'Complete') {
                                    dispatch(setSearchResult(resp.data));
                                    dispatch(setTableVisibleAction(true));
                                    dispatch(setLoaderVisible(false));
                                    dispatch(disableAnalyseButton(false));
                                    clearInterval(interval);
                                    return;
                                } else if (status[0] == 'Error') {
                                    dispatch(setSearchResult(resp.data));
                                    dispatch(setTableVisibleAction(false));
                                    dispatch(setLoaderVisible(false));
                                    clearInterval(interval);
                                    return;
                                }
                            })
                            .catch(err => {
                                console.log("Error in search result call api call!!!");
                                dispatch(setTableVisibleAction(false));
                                // dispatch(addTodoFailure(err.message));
                            });
                    }, 10 * 1000);
                }
            })
            .catch(err => {
                console.log("Error in search result call api call!!!");
                dispatch(setTableVisibleAction(false));
            });
    }
}