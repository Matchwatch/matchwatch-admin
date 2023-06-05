// This code defines a new Register component that renders a form with fields for the user's
// email and password. The form data is stored in the formData state using the useState hook.
// The onChange function updates the state when the user types in the fields,
// and the onSubmit function sends a post request to the server with the email and password
// when the form is submitted.

import React, { useState } from "react";
import axios from "axios";
import { backend } from "../../Context/Backend";

import "./Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post(
        `${backend}/api/admin/register`,
        body,
        config
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="register-page">
      <div class="box-form">
        <div class="left">
          <div class="overlay">
            <h1>Hello World.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              et est sed felis aliquet sollicitudin
            </p>
            {/* <span>
              <p>login with social media</p>
              <a href="#">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i class="fa fa-twitter" aria-hidden="true"></i> Login with
                Twitter
              </a>
            </span> */}
          </div>
        </div>

        <div class="right">
          <h5>Register</h5>
          <p style={{ color: "transparent" }}>
            Don't have an account?
            <a style={{ color: "transparent" }} href="#">
              Creat Your Account
            </a>
            it takes less than a minute
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                minLength="6"
              />
            </div>
            <input className="submit-btn" type="submit" value="Register" />
          </form>

          {/* <div class="remember-me--forget-password">
            <label>
              <input type="checkbox" name="item" checked />
              <span class="text-checkbox">Remember me</span>
            </label>
            <p>forget password?</p>
          </div> */}

          <br />
        </div>
      </div>
    </div>
  );
};

export default Register;
