import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_BOARDS
} from "./constants";

const initialState = {
   currentUser: localStorage.getItem("authenticated-user") || {},
   boards: []
};

const UserReducer = (
  state = initialState,
  { type, registeredUser, loggedInUser, success, message, boards }
) => {
  switch (type) {
    case REGISTER_USER:
      console.log(
        `%c {type: REGISTER_USER, registeredUser: ${JSON.stringify(
          registeredUser
        )}}`,
        "color: yellow; font-weight: bold"
      );
      return success
        ? { ...state, newUser: true }
        : { ...state, errorMessage: message };
    case LOGIN_USER:
      console.log(
        `%c {type: LOGIN_USER, loggedInUser: ${JSON.stringify(loggedInUser)}}`,
        "color: teal; font-weight: bold"
      );
      return {
        ...state,
        currentUser: loggedInUser
      };
    case LOGOUT_USER:
      console.log(
        `%c {type: LOGOUT_USER, currentUser: {}} `,
        "color: pink; font-weight: bold"
      );
      return { ...state, currentUser: {} };
    case FETCH_BOARDS:
      console.log(
        `%c {type: FETCH_BOARD, boards: ${JSON.stringify(boards)}}`,
        "color: violet; font-weight: bold"
      );
      return {
        ...state,
        boards
      };
    default:
      return state;
  }
};

export default UserReducer;
