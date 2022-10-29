import { SIGN_IN, SIGN_OUT,SIGN_IN_GB } from "./Model";

export const authInitalState = {
  Info: JSON.parse(localStorage.getItem("UserInfo")) || "" 
};
export const authReducer = (state = authInitalState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      console.log(payload)
      return {
        Info:payload
      };
      case SIGN_IN_GB:
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
