import { ActionTypes } from "../constants/action-types";

export const setSites = (sites) => {
    return {
        type: ActionTypes.SET_SITES,
        payload: sites
    }
};

export const selectedSite = (site) => {
    return {
        type: ActionTypes.SELECTED_SITE,
        payload: site
    }
};




