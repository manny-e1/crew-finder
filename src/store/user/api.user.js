import axios from "../../axios"

import { USER_DETAILS_FAIL, 
        USER_DETAILS_REQUEST, 
        USER_DETAILS_SUCCESS, 
        USER_GET_FAIL, 
        USER_GET_REQUEST, 
        USER_GET_SUCCESS, 
        USER_LOGIN_FAIL,
        USER_LOGIN_REQUEST, 
        USER_LOGIN_SUCCESS, 
        USER_LOGOUT, 
        USER_REGISTER_FAIL, 
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_UPDATE_PROFILE_REQUEST,
        USER_UPDATE_PROFILE_SUCCESS,
        USER_UPDATE_PROFILE_FAIL, } from "./types.user"


// const baseUrl = "http://localhost:5000";

export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post (
            '/users/login',
            { email, password },
            config 
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('currentUser', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message : error.message 
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('currentUser')
    dispatch({
        type: USER_LOGOUT
    })
}


export const register = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post (
            '/users',
            user,
            config 
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message : error.message 
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { currentUser },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
  
      const { data } = await axios.get(`/users/${id}`, config)
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, no token') {
        dispatch(logout())
      }
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      })
    }
  }

export const getUsers = (query) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_GET_REQUEST,
      })
  
      const {
        userLogin: { currentUser },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
  
      const { data } = await axios.get(`/users/${query}`, config)
  
      dispatch({
        type: USER_GET_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, no token') {
        dispatch(logout())
      }
      dispatch({
        type: USER_GET_FAIL,
        payload: message,
      })
    }
  }

  export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      })
  
      const {
        userLogin: { currentUser },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
  
      const { data } = await axios.put('/user/profile', user, config)
  
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
      localStorage.setItem('currentUser', JSON.stringify(data))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, no token') {
        dispatch(logout())
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      })
    }
  }