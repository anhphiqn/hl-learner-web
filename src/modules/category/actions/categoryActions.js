import axios from 'axios';

import { GET_ERRORS } from '../../common/types';

import {
  GET_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORYS,
  CATEGORY_LOADING,
} from '../types';

// Get Category
export const getCategory = (id, userEmail) => dispatch => {
  dispatch(setCategoryLoading());

  const serviceUrl = process.env.REACT_APP_CATEGORY_SERVICE_URL;
  const url = `${serviceUrl}/category/${id}/${userEmail}`; 
  axios
    .get(url)
    .then(res =>{
      debugger
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CATEGORY,
        payload: null
      })
    );
};
// Add category
export const addCategory = (categoryData, callback) => dispatch => {
  dispatch(setCategoryLoading());

  const serviceUrl = process.env.REACT_APP_CATEGORY_SERVICE_URL;
  const url = `${serviceUrl}/category`; 
  console.log(url);
  axios
    .post(url, categoryData)
    .then(res =>{
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      });
      callback();
    })
    .catch(err => {
      console.log('addCategory error ', err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    );
};

// Delete Category
export const deleteCategory = (id, userEmail) => dispatch => {
  var answer = window.confirm('Are you sure to delete this Category? This can NOT be undone!');
  if(!answer)
    return;  
  
    const serviceUrl = process.env.REACT_APP_CATEGORY_SERVICE_URL;
    const url = `${serviceUrl}/category/${id}/${userEmail}`; 

    axios
    .delete(url)
    .then(res =>{
      console.log('deleteCategory');
      console.log(id);
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      });
    })
    .catch(err => {
      console.log('deleteCategory err');
      console.log(err);
      
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    );
};

// Search categorys
export const getCategorys = (searchTerm, userEmail) => dispatch => {
  dispatch(setCategoryLoading());
  
  const serviceUrl = process.env.REACT_APP_CATEGORY_SERVICE_URL
  searchTerm = !searchTerm ? '*' : searchTerm; 
  const url = `${serviceUrl}/category/search/${searchTerm}/${userEmail}`;
  console.log(url);
 
  axios
    .get(url)
    .then(res =>
      {
        dispatch({
          type: GET_CATEGORYS,
          payload: res.data
        });  
      }
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORYS,
        payload: null
      })
    );
};

// Category loading
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};
