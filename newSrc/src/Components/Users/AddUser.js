import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState("");

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredAge.trim().length === 0 || enteredUsername.trim().length === 0) {
      setError({
        title: "invalid input my guy",
        message: "please enter name and age",
      });
      return;
    }
    if (+enteredAge < 0) {
      setError({
        title: "invalid age my guy",
        message: "please enter age > 0",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredAge("");
    setEnteredUsername("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor={"username"}>Username</label>
          <input
            id={"username"}
            type={"text"}
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor={"age"}>Age (years)</label>
          <input
            id={"age"}
            type={"number"}
            onChange={ageChangeHandler}
            value={enteredAge}
          />
          <Button type={"submit"}>Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;
