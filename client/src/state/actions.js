import { REGISTER_USER, LOGIN_USER, ERROR } from "./constants";

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
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
    const { token, success, user: registerUser } = await registerRes.json();
    if (success) {
      dispatch({ type: REGISTER_USER, registerUser, success });
      console.log(
        `${user.username}'s account was REGISTERED and set in localstorage`
      );
      return localStorage.setItem(
        "authenticated-user",
        JSON.stringify({ token, username: registerUser.username })
      );
    }
  } catch (error) {
    console.error(error);
    return dispatch({ type: ERROR, message: error.message });
  }
};

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
      body: JSON.stringify({
        username,
        password
      })
    });
    const { token, success, user: loggedInUser } = await loginRes.json();
    if (success) {
      dispatch({ type: LOGIN_USER, loggedInUser, success });
      console.log(
        `${user.username}'s account was LOGGED IN and set in localstorage`
      );
      return localStorage.setItem(
        "authenticated-user",
        JSON.stringify({ token, username: registerUser.username })
      );
    }
  } catch (error) {
    console.error(error);
    return dispatch({ type: ERROR, message: error.message });
  }
};
