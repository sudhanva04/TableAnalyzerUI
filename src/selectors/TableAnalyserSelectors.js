import { createSelector } from 'reselect';

export const isDisableAnalyseBtn = state => state.disableAnalyseBtn;
export const getSearchInput = state => state.searchInput;
export const isTableVisible = state => state.isTableVisible;

export const dataTableData = state => {
    console.log('manipulating state for datatable');
    return state.searchResults;
}

export const dataTableSelector = createSelector(
    [dataTableData],
    (dataTableData) => {
        return dataTableData;
    }
)