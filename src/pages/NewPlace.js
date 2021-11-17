import Input from "../components/UIs/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";
import { useForm } from "../hooks/use-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/use-http";
import { useNavigate } from "react-router";
import ErrorModal from "../components/UIs/ErrorModal";
import ImageUpload from "../components/UIs/ImageUpload";
import LoadingSpinner from "../components/UIs/LoadingSpinner";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
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

  const navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="form mt-4 mb-4" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="center">Add Place</h2>
        {!isLoading && (
          <>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a title."
              onInput={inputHandler}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a description (at least 5 characters)."
              onInput={inputHandler}
            />
            <Input
              id="address"
              element="input"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter an address."
              onInput={inputHandler}
            />
            <ImageUpload
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
            <button className="btn" type="submit" disabled={!formState.isValid}>
              ADD PLACE
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default NewPlace;
