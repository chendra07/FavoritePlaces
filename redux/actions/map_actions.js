import Services from "../../services";
import { GOOGLE_API_KEYS } from "@env";

export const getAddress =
  (lat, lng, showLoading, dismissLoading) => (dispatch) => {
    showLoading && dispatch(showLoading());
    const result = Services.Get(
      `https://maps.googleapis.com`,
      `maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEYS}`
    )
      .then((resp) => {
        return resp.data.results[0].formatted_address;
      })
      .catch((error) => {
        console.log("error: ", error);
        return "undefined";
      })
      .finally(() => {
        dismissLoading && dispatch(dismissLoading());
      });

    return result;
  };
