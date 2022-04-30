import { ActionTypes } from "../constants/action-types";

export const setArticles = (articles) => {
    return {
        type: ActionTypes.SET_ARTICLES,
        payload: articles
    }
}

export const setFavoriteArticles = (favoriteArticles) => {
    return {
        type: ActionTypes.SET_FAVORITE_ARTICLES,
        payload: favoriteArticles
    }
}
