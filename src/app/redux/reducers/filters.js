import { defaultFilter } from '../DEFAULT_STATES';

const filtersReducer = ( state = defaultFilter, action ) => {
    
    switch (action.type) {
        case 'CHANGE_FILTER' : 
            const new_state = {...state, ...{ [action.key]: action.value }};
            return new_state;
        default :
            return state;

    }
} 

export default filtersReducer;