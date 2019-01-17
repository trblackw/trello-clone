import { FETCH_BOARDS } from "../constants";

export const fetchBoards = async (user, dispatch) => {
  const { id, token } = user;
  try {
    const res = await fetch(`http://localhost:8080/user/${id}/boards`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const { success, boards } = await res.json();
    if (success) {
      console.log(boards);
      return dispatch({ type: FETCH_BOARDS, boards });
    }
  } catch (error) {
    console.error(error);
  }
};
