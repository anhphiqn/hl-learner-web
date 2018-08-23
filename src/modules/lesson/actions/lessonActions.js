import axios from 'axios';

import { GET_ERRORS } from '../../common/types';

import {
  GET_LESSON,
  DELETE_LESSON,
  GET_LESSONS,
  LESSON_LOADING,
} from '../types';

// Get Lesson
export const getLesson = (id, userEmail) => dispatch => {
  dispatch(setLessonLoading());

  const serviceUrl = process.env.REACT_APP_LESSON_SERVICE_URL;
  const url = `${serviceUrl}/lesson/${id}/${userEmail}`; 
  axios
    .get(url)
    .then(res =>{
      dispatch({
        type: GET_LESSON,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_LESSON,
        payload: null
      })
    );
};
// Add lesson
export const addLesson = (lessonData, callback) => dispatch => {
  dispatch(setLessonLoading());

  const serviceUrl = process.env.REACT_APP_LESSON_SERVICE_URL;
  const url = `${serviceUrl}/lesson`; 
  console.log(url);
  axios
    .post(url, lessonData)
    .then(res =>{
      dispatch({
        type: GET_LESSON,
        payload: res.data
      });
      callback();
    })
    .catch(err => {
      console.log('addLesson error ', err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    );
};

// Delete Lesson
export const deleteLesson = (id, userEmail) => dispatch => {
  var answer = window.confirm('Are you sure to delete this Lesson? This can NOT be undone!');
  if(!answer)
    return;  
  
    const serviceUrl = process.env.REACT_APP_LESSON_SERVICE_URL;
    const url = `${serviceUrl}/lesson/${id}/${userEmail}`; 

    axios
    .delete(url)
    .then(res =>{
      console.log('deleteLesson');
      console.log(id);
      dispatch({
        type: DELETE_LESSON,
        payload: id
      });
    })
    .catch(err => {
      console.log('deleteLesson err');
      console.log(err);
      
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    );
};

// Search lessons
export const getLessons = (searchTerm, userEmail) => dispatch => {
  dispatch(setLessonLoading());
  const serviceUrl = process.env.REACT_APP_LESSON_SERVICE_URL
  searchTerm = !searchTerm ? '*' : searchTerm; 
  const url = `${serviceUrl}/lesson/search/${searchTerm}/${userEmail}`;
  console.log(url);
 
  axios
    .get(url)
    .then(res =>
      {
        dispatch({
          type: GET_LESSONS,
          payload: res.data
        });  
      }
    )
    .catch(err =>
      dispatch({
        type: GET_LESSONS,
        payload: null
      })
    );
};

// Lesson loading
export const setLessonLoading = () => {
  return {
    type: LESSON_LOADING
  };
};
