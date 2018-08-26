import axios from 'axios';

import { GET_ERRORS } from '../../common/types';

import {
  GET_COURSE,
  DELETE_COURSE,
  GET_COURSES,
  COURSE_LOADING,

  GET_COURSE_ENROLL,
  DELETE_COURSE_ENROLL,
  GET__COURSE_ENROLLS,
  _COURSE_ENROLL_LOADING,
} from '../types';

// Get Course
export const getCourse = (id, userEmail) => dispatch => {
  dispatch(setCourseLoading());

  const serviceUrl = process.env.REACT_APP_COURSE_SERVICE_URL;
  const url = `${serviceUrl}/course/${id}/${userEmail}`; 

  axios
    .get(url)
    .then(res =>{
      dispatch({
        type: GET_COURSE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_COURSE,
        payload: null
      })
    );
};
// Add course
export const addCourse = (courseData, callback) => dispatch => {
  dispatch(setCourseLoading());

  const serviceUrl = process.env.REACT_APP_COURSE_SERVICE_URL;
  const url = `${serviceUrl}/course`; 
  console.log(url);
  axios
    .post(url, courseData)
    .then(res =>{
      dispatch({
        type: GET_COURSE,
        payload: res.data
      });
      callback();
    })
    .catch(err => {
      console.log('addCourse error ', err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    );
};

// enrollCourse
export const enrollCourse = (courseEnrollData, callback) => dispatch => {
  dispatch(setCourseLoading());

  const serviceUrl = process.env.REACT_APP_COURSE_SERVICE_URL;
  const url = `${serviceUrl}/course/enroll`; 
  console.log(url);
  axios
    .post(url, courseEnrollData)
    .then(res =>{
      dispatch({
        type: GET_COURSE_ENROLL,
        payload: res.data
      });
      callback();
    })
    .catch(err => {
      console.log('enrollCourse error ', err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    );
};

// Delete Course
export const deleteCourse = (id, userEmail) => dispatch => {
  var answer = window.confirm('Are you sure to delete this Course? This can NOT be undone!');
  if(!answer)
    return;  
  
    const serviceUrl = process.env.REACT_APP_COURSE_SERVICE_URL;
    const url = `${serviceUrl}/course/${id}/${userEmail}`; 

    axios
    .delete(url)
    .then(res =>{
      console.log('deleteCourse');
      console.log(id);
      dispatch({
        type: DELETE_COURSE,
        payload: id
      });
    })
    .catch(err => {
      console.log('deleteCourse err');
      console.log(err);
      
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    );
};

// Search courses
export const getCourses = (searchTerm, userEmail) => dispatch => {
  dispatch(setCourseLoading());
  const serviceUrl = process.env.REACT_APP_COURSE_SERVICE_URL
  searchTerm = !searchTerm ? '*' : searchTerm; 
  const url = `${serviceUrl}/course/search/${searchTerm}/${userEmail}`;
  console.log(url);
 
  axios
    .get(url)
    .then(res =>
      {
        dispatch({
          type: GET_COURSES,
          payload: res.data
        });  
      }
    )
    .catch(err =>
      dispatch({
        type: GET_COURSES,
        payload: null
      })
    );
};

// Course loading
export const setCourseLoading = () => {
  return {
    type: COURSE_LOADING
  };
};
