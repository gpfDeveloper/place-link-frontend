import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../components/UIs/Input";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";

import { useForm } from "../hooks/use-form";
import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/use-http";
import LoadingSpinner from "../components/UIs/LoadingSpinner";
import ErrorModal from "../components/UIs/ErrorModal";

const UpdatePlace = () => {
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().pid;
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlace();
  }, [setFormData, sendRequest, placeId]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bear " + auth.token,
        }
      );
      navigate("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (isLoading || !loadedPlace) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="form mt-4" onSubmit={placeUpdateSubmitHandler}>
          <h2 className="center">Update Place</h2>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a description (min. 6 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <button className="btn" type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
