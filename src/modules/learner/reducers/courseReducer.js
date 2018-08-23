import {
    GET_COURSE,
    GET_COURSES,
    COURSE_LOADING,
    DELETE_COURSE,
} from '../types';

const initialState = {
    course: null,
    courses: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case COURSE_LOADING:
            console.log('reducer COURSE_LOADING ');
            return {
                ...state,
                loading: true
            };
        case GET_COURSE:
            return {
                ...state,
                course: action.payload,
                loading: false
            };
        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course._id !== action.payload)
            };
        case GET_COURSES:
            return {
                ...state,
                courses: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
