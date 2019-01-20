import React, { useState } from "react";
import styled from "styled-components";
import useToggle from "../hooks/useToggle";

const AddBoard = () => {
  const [on, setOn] = useToggle(false);
  const [board, setBoard] = useState({
    title: "",
    description: "",
    columns: 0
  });

  const handleInput = e => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <AddBoardContainer onSubmit={e => handleSubmit(e)}>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="title"
        >
          Board title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Super awesome board"
          name="title"
          onChange={e => handleInput(e)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="desc"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
          id="desc"
          type="text"
          placeholder="What's the purpose"
          name="description"
          onChange={e => handleInput(e)}
        />
      </div>
      <div className="inline-block relative w-64 mb-4">
        <label
          htmlFor="columns"
          className="block text-grey-darker text-sm font-bold mb-2"
        >
          Column Count
        </label>
        <select
          className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="columns"
          name="columns"
          onChange={e => handleInput(e)}
        >
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg
            className="fill-current h-4 w-4 mt-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="title"
        >
          Labels
        </label>
        <small className="text-xs">Not working currently</small>
        <div className="flex flex-row">
          <button className="bg-orange btn-sm hover:bg-orange-dark text-white font-bold py-2 px-4 rounded-full">
            First board!
          </button>
          <button onClick={() => setOn(true)}>
            <span className="mt-2 ml-2">
              <img src="https:icon.now.sh/plus/aaa" alt="plus icon" />
            </span>
          </button>
          {on && <input type="text" placeholder="new label" />}
        </div>
      </div>
    </AddBoardContainer>
  );
};

export default AddBoard;

const AddBoardContainer = styled("form")`
  margin: 0 auto;
  padding: 1em;
`;
