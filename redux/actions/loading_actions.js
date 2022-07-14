import { loading_types } from "../action-types";

const { SHOW_LOADING, DISMISS_LOADING, SHOW_MAP_LOADING, DISMISS_MAP_LOADING } =
  loading_types;

export const showLoading = (payload) => {
  return {
    type: SHOW_LOADING,
    payload: payload,
  };
};

export const dismissLoading = (payload) => {
  return {
    type: DISMISS_LOADING,
    payload: payload,
  };
};
