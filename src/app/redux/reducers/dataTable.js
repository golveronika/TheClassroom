import { defaultDataTable } from '../DEFAULT_STATES';

const dataTableReducer = ( state = defaultDataTable, action ) => {
    let new_state;
    switch (action.type) {
        case 'EDIT' : 
            new_state = state.payload.map(item =>
                 (item.id === action.id)
                   ? action.edited_item
                   : item);
            return { payload: new_state };
        case 'DELETE' : 
            new_state = state.payload.filter(item => (item.id !== action.id));
            return { payload: new_state };
        case 'ADD' : 
            new_state =  state.payload;
            new_state =  new_state.concat(action.item);
            return { payload: new_state };
        default :
            return state;
    }
} 

export default dataTableReducer;