
import { defaultLogged } from '../DEFAULT_STATES';

const loggedReducer = ( state = defaultLogged, action ) => {

    switch (action.type) {
        case 'SIGN_IN' : 
            return {
                isLogged: action.isLogged,
                userName: action.userName
            };
        default:
            return state;
    }

} 

export default loggedReducer;