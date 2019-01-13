import React, { useState } from "react";
import { navigate } from "@reach/router";
import { registerUser } from "../state/actions";
import { useContext } from "react";
import UserContext from "../state/context";

const initialRegisterFormState = {
  username: "",
  email: "",
  password: "",
  organization: "Project Shift"
};

const Register = () => {
  const [user, setUser] = useState(initialRegisterFormState);
  const { dispatch } = useContext(UserContext);

  const handleInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUser(initialRegisterFormState);
    registerUser(user, dispatch);
    navigate("/");
  };
  return (
    <div className="container max-w-md mx-auto my-5 p-2">
      <form className="w-full mx-auto" onSubmit={e => handleSubmit(e)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-username"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-username"
              name="username"
              autoFocus
              type="text"
              placeholder="Jane"
              onChange={e => handleInput(e)}
            />
            {/* <p className="text-red text-xs italic">
              Please fill out this field.
            </p> */}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="grid-email"
              name="email"
              type="email"
              placeholder="Doe"
              onChange={e => handleInput(e)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="grid-password"
              name="password"
              type="password"
              placeholder="******************"
              onChange={e => handleInput(e)}
            />
            <p className="text-grey-dark text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-org"
            >
              Organization <small className="font-thin">(optional)</small>
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="grid-org"
              name="organization"
              type="text"
              defaultValue="Project Shift"
              placeholder="Project Shift"
              onChange={e => handleInput(e)}
            />
          </div>
          <button
            type="submit"
            className="btn bg-blue-dark font-bold hover:bg-blue-darker p-2 mt-5 rounded border text-white mx-auto"
          >
            Sign me up!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
