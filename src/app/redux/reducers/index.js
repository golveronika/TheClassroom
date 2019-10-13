import loggedReducer from './loggedUser';
import dataTableReducer from './dataTable';
import filtersReducer from './filters';
import dataFiltredReducer from './dataFiltred';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    loggedUser: loggedReducer,
    dataTable: dataTableReducer,
    dataFiltred: dataFiltredReducer,
    filters: filtersReducer,
});

export default allReducers;
