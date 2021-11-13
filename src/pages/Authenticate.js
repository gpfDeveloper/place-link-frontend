import React, { useState,useContext } from "react";

import Card from "../components/UIs/Card";
import { AuthContext } from "../contexts/auth-context";
import Input from "../components/UIs/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../utils/validators";
import { useForm } from "../hooks/use-form";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="mt-2">
      <form className="form" onSubmit={authSubmitHandler}>
        <h2>{isLoginMode ? "Sign In" : "Sign Up"}</h2>
        <hr />
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="Your Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <button className="btn" type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </button>
        <button className="btn btn--outline" onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGN UP" : "SIGN IN"}
        </button>
      </form>
    </Card>
  );
};

export default Auth;
