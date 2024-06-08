import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userState, setUserState] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    chrome.runtime.sendMessage(
      { type: "login", email: userState.email, password: userState.password },
      (response) => {
        if (response?.statusCode >= 400) {
          setError(true);
        } else {
          localStorage.setItem(
            "viwa_auth_token",
            JSON.stringify(response.data.token)
          );
          navigate("/");
        }
      }
    );
  };

  return (
    <Form className="form" onSubmit={handleFormSubmit}>
      <React.Fragment>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(ev) =>
              setUserState((prevState) => {
                const UPDATED_STATE = { ...prevState };
                UPDATED_STATE.email = ev.target.value;
                return UPDATED_STATE;
              })
            }
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(ev) =>
              setUserState((prevState) => {
                const UPDATED_STATE = { ...prevState };
                UPDATED_STATE.password = ev.target.value;
                return UPDATED_STATE;
              })
            }
            required
          />
        </Form.Group>{" "}
        <p>
          Don't have an account? <Link to={"/register"}>Sign up</Link>
        </p>
        <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
          Log in
        </Button>
        {error && (
          <Button variant="danger" disabled>
            Wrong credentials
          </Button>
        )}
      </React.Fragment>
    </Form>
  );
};

export default Login;
