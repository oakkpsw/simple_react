import { GET_PROFILE } from "../actions/authAction";
import { GET_VERSION } from "../actions/authAction";
// start props
const initState = {
  profile: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
      };
    case GET_VERSION:
      return {
        ...state,
        version: action.payload.version,
      };
    default:
      break;
  }
  return state;
};

export default authReducer;
