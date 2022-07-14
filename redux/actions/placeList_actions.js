import { placeList_types } from "../action-types";
// import Services from "../../services";

const { ADD_PLACE_LIST, DELETE_PLACE_LIST, UPDATE_PLACE_LIST } =
  placeList_types;
// const {Get, Post, Put, Delete} = Services;

const setAddNewPlaceList = (payload) => {
  return {
    type: ADD_PLACE_LIST,
    payload: payload,
  };
};

const setDeletePlaceList = (payload) => {
  return {
    type: DELETE_PLACE_LIST,
    payload: payload,
  };
};

const setUpdatePlaceList = (payload) => {
  return {
    type: UPDATE_PLACE_LIST,
    payload: payload,
  };
};

export const addNewPlaceList = (data) => (dispatch) => {
  dispatch(setAddNewPlaceList(data));
};

export const deletePlaceList = (data) => (dispatch) => {
  dispatch(setDeletePlaceList(data));
};

export const updatePlaceList = (data) => (dispatch) => {
  dispatch(setUpdatePlaceList(data));
};
