import { ActionTypes } from "../constants/action-types";

const initialState = {
    articles : [
        {
            id: 5,
            name: 'Article 1',
            description: 'Description 1',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isFavorite: true,
        },
        {
            id: 4,
            name: 'Article 4',
            description: 'Description 1',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isFavorite: false,
        },
    ],
};

export const articlesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_ARTICLES:
            //check for payload is alredy exist in articles array
            if(state.articles.find(article => article.id === payload.id)){
                return state;
            }
            return { ...state, articles: [...state.articles, payload] };

        case ActionTypes.SET_FAVORITE_ARTICLES:
            console.log(state.articles);
            return { 
                ...state, 
                articles: state.articles.map(article => {
                    console.log(article.id, payload.id);
                    if(article.id === payload.id){
                        return {
                            ...article,
                            isFavorite: !article.isFavorite
                        }
                    }
                    return article;
                })
            };
        default:
            return state;
    }
}

// export const favoriteArticlesReducer = (state = initialState, {type, payload}) => {
//     switch (type) {
//         case ActionTypes.SET_FAVORITE_ARTICLES:
//             console.log(state.articles);
//             return { 
//                 ...state, 
//                 articles: state.articles.map(article => {
//                     console.log(article.id, payload.id);
//                     if(article.id === payload.id){
//                         return {
//                             ...article,
//                             isFavorite: !article.isFavorite
//                         }
//                     }
//                     return article;
//                 })
//             };
//         default:
//             return state;
//     }
// }