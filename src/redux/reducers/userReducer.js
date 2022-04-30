import { ActionTypes } from "../constants/action-types";

const initialState = {
    users : [
        {
            id: 1,
            name: '',
            phoneNumber:'',
            password: '',
            isLogin: false,
        },
    ],
};

export const userReducer = (state = initialState, {type, payload}) => {
   
    switch (type) {

        case ActionTypes.SET_USER:
            console.log(payload);
            return { ...state, users: [...state.users, payload] };

        case ActionTypes.SET_LOGIN:
            // console.log('in set login');
            return { ...state, users: state.users.map(user => {
                if(user.phoneNumber === payload.phoneNumber){
                    console.log({...user,isLogin: true});
                    return {
                        ...user,
                        isLogin: true,
                    }
                }
                return user;
            })};

        case ActionTypes.SET_LOGOUT:
            // console.log("in set logout");
            return { ...state, users: state.users.map(user => {
                if(user.phoneNumber === payload.phoneNumber){
                    console.log({...user,isLogin: false});
                    return {
                        ...user,
                        isLogin: false
                    }
                }
                return user;
            })};
        case ActionTypes.SET_NAME:
            return { ...state, users: state.users.map(user => {
                if(user.phoneNumber === payload.user.phoneNumber){
                    return {
                        ...user,
                        name: payload.name
                    }
                }
                return user;
            })};
        default:
            return state;
    }
}