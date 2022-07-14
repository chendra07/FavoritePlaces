import { placeList_types } from "../action-types";

const { ADD_PLACE_LIST, DELETE_PLACE_LIST, UPDATE_PLACE_LIST } =
  placeList_types;

const initialState = {
  placeList: [],
};

export const placeList_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_PLACE_LIST:
      return { ...state, placeList: [...state.placeList, payload] };
    case DELETE_PLACE_LIST:
      return {
        ...state,
        placeList: state.placeList.filter((item) => item.id !== payload.id),
      };
    case UPDATE_PLACE_LIST:
      const selectedData = state.placeList.map((item) =>
        item.id === payload.id ? { ...state.placeList, ...payload } : item
      );
      console.log("selectedData: ", selectedData);

      return { ...state };
    default:
      return state;
  }
};
