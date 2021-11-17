import React, { useState, useContext } from "react";

import Card from "../components/UIs/Card";
import { AuthContext } from "../contexts/auth-context";
import Input from "../components/UIs/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../utils/validators";
import { useForm } from "../hooks/use-form";
import { useHttpClient } from "../hooks/use-http";
import LoadingSpinner from "../components/UIs/LoadingSpinner";
import ImageUpload from "../components/UIs/ImageUpload";
import ErrorModal from "../components/UIs/ErrorModal";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
          image: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        const email = formState.inputs.email.value;
        const name = formState.inputs.name.value;
        const password = formState.inputs.password.value;
        const image = formState.inputs.image.value;
        formData.append("email", email);
        formData.append("name", name);
        formData.append("password", password);
        formData.append("image", image);
        const responseData = await sendRequest(
          `${BACKEND_URL}/users/signup`,
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="mt-4 mb-4">
        {isLoading && <LoadingSpinner asOverlay />}
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
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              btnText="PICK AVATAR"
              errorText="Please provide an avatar."
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <div className="form__actions">
            <button className="btn" type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={switchModeHandler}
            >
              SWITCH TO {isLoginMode ? "SIGN UP" : "SIGN IN"}
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Auth;
