import React from "react";

const Signup = () => {
  // create a signup form with first name, last name, email, and password
  // create a signup button that will send the user to the login page
  const SignupForm = () => {
    return (
      <div>
        <h1>Signup</h1>
        <form>
          <label>
            First Name:
            <input type="text" name="firstName" />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName" />
          </label>
          <br />
          <label>
            Email:
            <input type="text" name="email" />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <br />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default Signup;
