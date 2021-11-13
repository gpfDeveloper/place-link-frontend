import Input from "../components/UIs/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";
import { useForm } from "../hooks/use-form";

const NewPlace = () => {
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
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="form mt-4" onSubmit={placeSubmitHandler}>
      <h2 className="center">Add Place</h2>
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
      <button className="btn" type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </button>
    </form>
  );
};

export default NewPlace;
