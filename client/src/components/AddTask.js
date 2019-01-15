import React from "react";
import styled from "styled-components";

const AddTask = ({ setOpen }) => {
  return (
    <Container>
      <input
        type="text"
        autoFocus
        placeholder="new task"
        className="appearance-none shadow-md block w-full bg-grey-lighter text-grey-darker rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      />
      <div>
        <button className="mx-2 pt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 31.11 31.11"
            enableBackground="new 0 0 31.11 31.11"
            fill="#3CB371"
          >
            <g data-name="checkmark">
              <rect width="24px" height="24px" opacity="0" />
              <path d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z" />
            </g>
          </svg>
        </button>
        <button className="mx-2" onClick={() => setOpen(false)}>
          <img src="https:icon.now.sh/x/B22222" alt="x" />
        </button>
      </div>
    </Container>
  );
};

export default AddTask;

const Container = styled("div")`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 1rem;
  background: whitesmoke;
  color: black;

  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0 auto;
    padding: 0.5em;
  }
`;
