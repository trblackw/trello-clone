import {
  REGISTER_USER,
  LOGIN_USER,
  ERROR,
  FETCH_USER_BOARD
} from "../constants";

//user registration
export const registerUser = async (user, dispatch) => {
  const { username, email, password } = user;
  try {
    const registerRes = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ username, email, password })
    });
    const { token, success, user: registeredUser } = await registerRes.json();
    if (success) {
      dispatch({ type: REGISTER_USER, registeredUser, success });
      console.log(
        `${user.username}'s account was REGISTERED and set in localstorage`
      );
      return localStorage.setItem(
        "authenticated-user",
        JSON.stringify({
          token,
          username: registeredUser.username,
          id: registeredUser._id
        })
      );
    }
  } catch (error) {
    console.error(error);
    return dispatch({ type: ERROR, message: error.message });
  }
};

//user login
export const loginUser = async (user, dispatch) => {
  const { username, password } = user;
  try {
    const loginRes = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ username, password })
    });
    const { token, success, user: loggedInUser } = await loginRes.json();
    if (success) {
      dispatch({ type: LOGIN_USER, loggedInUser, success });
      console.log(
        `${user.username}'s account was LOGGED IN and set in localstorage`
      );
      return localStorage.setItem(
        "authenticated-user",
        JSON.stringify({
          token,
          username: loggedInUser.username,
          id: loggedInUser._id,
          organization: loggedInUser.organization
        })
      );
    }
  } catch (error) {
    console.error(error);
    return dispatch({ type: ERROR, message: error.message });
  }
};

//fetch user boards after user login
// export const fetchUserBoard = async dispatch => {
//   const { token, id } = JSON.parse(localStorage.getItem("authenticated-user"));
//   if (token && id) {
//     try {
//       const res = await fetch(`http://localhost:8080/user/${id}`, {
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const {
//         success,
//         user: { boards }
//       } = await res.json();
//       dispatch({ type: FETCH_USER_BOARD, success, boards });
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };
