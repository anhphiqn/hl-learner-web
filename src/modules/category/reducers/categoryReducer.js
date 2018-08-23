import {
    GET_CATEGORY,
    GET_CATEGORYS,
    CATEGORY_LOADING,
    DELETE_CATEGORY,
} from '../types';

const initialState = {
    category: null,
    categorys: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CATEGORY_LOADING:
            console.log('reducer CATEGORY_LOADING ');
            return {
                ...state,
                loading: true
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categorys: state.categorys.filter(category => category._id !== action.payload)
            };
        case GET_CATEGORYS:
            return {
                ...state,
                categorys: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
