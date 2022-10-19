import { SIGN_IN, SIGN_OUT } from "./Model";

export const authInitalState = {
  Info:""
};
export const authReducer = (state = authInitalState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      console.log(payload)
      return {
        Info:payload
      };
      case SIGN_OUT:
     return{
      Info:null
     };


    default:
      return state;
  }
};
