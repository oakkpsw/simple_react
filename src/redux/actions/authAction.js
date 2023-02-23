import axios from "axios";

export const GET_PROFILE = "GET_PROFILE";
export const GET_VERSION = "GET_VERSION";

export const updateProfile = (profile) => {
  return {
    type: GET_PROFILE,
    payload: {
      profile: profile,
    },
  };
};

export const getVersion = () => {
  // return {
  //   type: GET_VERSION,
  //   payload: {
  //     version: "1.0.0",
  //   },
  // };
  return async (dispatch) => {
    const url = "https://api.codingthailand.com/api/version";
    const response = await axios.get(url);
    dispatch({
      type: GET_VERSION,
      payload: {
        version: response.data.data.version,
      },
    });
  };
};
