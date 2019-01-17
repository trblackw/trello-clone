import { createContext } from "react";

const UserContext = createContext({
  currentUser: localStorage.getItem("authenticated-user")
    ? JSON.parse(localStorage.getItem("authenticated-user"))
      : {},
   boards: []
});

export default UserContext;
