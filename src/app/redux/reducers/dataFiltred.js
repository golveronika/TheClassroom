
import { defaultDataTable } from '../DEFAULT_STATES';

const dataFiltredReducer = ( state = defaultDataTable, action ) => {
    let new_state, to_up, to_down;
    switch (action.type) {
        case 'SET_FILTER' : 
            // Make a copy of main state
            new_state = { ...action.dataItems };

            // Find column of sorting (not date)
            const sort_column = Object.keys(action.filters)
                .filter(column => (action.filters[column].sort !== null && !action.filters[column].hasOwnProperty("from")));

            // Sort table (not date)
            if (sort_column.length > 0) {
                to_up = (action.filters[sort_column].sort === 'DESC') ? (-1) : (1);
                to_down = (action.filters[sort_column].sort === 'DESC') ? (1) : (-1);
                new_state.payload.sort(function(a, b) {
                    if(a[sort_column] < b[sort_column])  return to_up;
                    if(a[sort_column] > b[sort_column])  return to_down;
                    if(a[sort_column] < b[sort_column])  return to_up;
                    if(a[sort_column] > b[sort_column])  return to_down;
                    return 0;
                });
            }

            // Find column of sorting (only date)
            const sort_date_column = Object.keys(action.filters)
                .filter(column => (action.filters[column].sort !== null && action.filters[column].hasOwnProperty("from")));

            // Sort table (only date)
            if (sort_date_column.length > 0) {
                to_up = (action.filters[sort_date_column].sort === 'DESC') ? (-1) : (1);
                to_down = (action.filters[sort_date_column].sort === 'DESC') ? (1) : (-1);
                new_state.payload.sort(function(a, b) {

                const a_date = new Date(
                    a[sort_date_column].split(".")[2],
                    (+a[sort_date_column].split(".")[1] - 1),
                    a[sort_date_column].split(".")[0]
                ); 
                const b_date = new Date(
                    b[sort_date_column].split(".")[2],
                    (+b[sort_date_column].split(".")[1] - 1),
                    b[sort_date_column].split(".")[0]
                ); 
                    if(a_date < b_date)  return to_up;
                    if(a_date > b_date)  return to_down;
                    if(a_date < b_date)  return to_up;
                    if(a_date > b_date)  return to_down;
                    return 0;
                });
            }

            // Find columns of searching
            const search_columns = Object.keys(action.filters)
                .filter(column => (action.filters[column].hasOwnProperty("search") && action.filters[column].search !== null));
            
            // Filter table for serch textes
            if (search_columns.length > 0) {
                search_columns.forEach(function(column) {
                    new_state.payload = new_state.payload
                        .filter(item => {
                            const text_column = item[column].toUpperCase();
                            const search_text = action.filters[column].search.toUpperCase();
                            return (text_column.indexOf(search_text) >= 0)
                        })
                });
            }

            // Find columns of categories
            const category_columns = Object.keys(action.filters)
                .filter(column => (action.filters[column].hasOwnProperty("category") && action.filters[column].category !== null));   
            
            // Filter table for category
            if (category_columns.length > 0) {
                category_columns.forEach(function(column) {
                    new_state.payload = new_state.payload
                        .filter(item => {
                           const text_column = item[column];
                           const search_text = action.filters[column].category;          
                           return (text_column === search_text);
                        })
                });
            }
            // Find columns of date
            const date_columns = Object.keys(action.filters)
                .filter(column => 
                    (action.filters[column].hasOwnProperty("from") && 
                    (action.filters[column].from !== null || action.filters[column].to !== null)));  

            // Filter table for date
            if (date_columns.length > 0) {
                date_columns.forEach(function(column) {
                    new_state.payload = new_state.payload
                        .filter(item => {
                            const from_date = action.filters[column].from; 
                            const to_date = action.filters[column].to; 
                            const item_date = new Date(
                                item[date_columns].split(".")[2],
                                (+item[date_columns].split(".")[1] - 1),
                                item[date_columns].split(".")[0]
                            ); 
                           return ((item_date >= from_date || from_date === null) && (item_date <= to_date || to_date === null));
                        })
                });
            }

            return new_state;

        default :
            return state;

    }
} 

export default dataFiltredReducer;