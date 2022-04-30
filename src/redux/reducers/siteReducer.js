import { ActionTypes } from "../constants/action-types";

const initialState = {
    sites : [],
    selectedSite: null
};

export const siteReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_SITES:
            return { ...state, sites: payload };
        default:
            return state;
    }
}