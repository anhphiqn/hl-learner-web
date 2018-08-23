import {
    GET_LESSON,
    GET_LESSONS,
    LESSON_LOADING,
    DELETE_LESSON,
} from '../types';

const initialState = {
    lesson: null,
    lessons: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LESSON_LOADING:
            console.log('reducer LESSON_LOADING ');
            return {
                ...state,
                loading: true
            };
        case GET_LESSON:
            return {
                ...state,
                lesson: action.payload,
                loading: false
            };
        case DELETE_LESSON:
            return {
                ...state,
                lessons: state.lessons.filter(lesson => lesson._id !== action.payload)
            };
        case GET_LESSONS:
            return {
                ...state,
                lessons: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
