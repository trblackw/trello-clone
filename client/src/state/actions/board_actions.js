import { CREATE_BOARD } from "../constants";

export const createBoard = async user => {
  const { id, token } = user;
  const res = await fetch(`http://localhost:8080/user/${id}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const { success, boards } = await res.json();
  console.log({ success, boards });
};
