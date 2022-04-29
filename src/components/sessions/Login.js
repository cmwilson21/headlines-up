import React from "react";

const Login = () => {
  // create a login form with email and password
  // create a login button that will send the user to the game page
  const LoginForm = () => {
    return (
      <div>
        <h1>Login</h1>
        <form>
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
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
