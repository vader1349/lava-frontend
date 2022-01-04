import { Action } from "./actions";

const initialState= {
    user:{
        id:0,
    },
}

function reducer(state=initialState,action){
    switch(action.type){
        case Action.login:
            return{
                ...state,
                user:action.payload,
            };
        case Action.logout:
            return{
                ...state,
                user:{
                    id:0,
                },
            };
        default:
            return state;
    }
}

export default reducer;