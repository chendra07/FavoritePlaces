import { loading_types } from "../action-types";

const { SHOW_LOADING, DISMISS_LOADING } = loading_types;

const initialState = {
  loading: false,
};

export const loading_reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SHOW_LOADING:
      return { ...state, loading: true };
    case DISMISS_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
