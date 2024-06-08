import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const [userState, setUserState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerResponse, setRegisterResponse] = useState();
  const [error, setError] = useState(false);
  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    chrome.runtime.sendMessage(
      {
        type: "register",
        firstName: userState.firstName,
        lastName: userState.lastName,
        email: userState.email,
        password: userState.password,
        confirmPassword: userState.confirmPassword,
      },
      (response) => {
        if (response?.statusCode >= 400) {
          setError(true);
        } else {
          setRegisterResponse(response.data);
        }
      }
    );
  };

  return (
    <Form className="form" onSubmit={handleFormSubmit}>
      {!registerResponse && (
        <React.Fragment>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John"
                  onChange={(ev) =>
                    setUserState((prevState) => {
                      const UPDATED_STATE = { ...prevState };
                      UPDATED_STATE.firstName = ev.target.value;
                      return UPDATED_STATE;
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Doe"
                  onChange={(ev) =>
                    setUserState((prevState) => {
                      const UPDATED_STATE = { ...prevState };
                      UPDATED_STATE.lastName = ev.target.value;
                      return UPDATED_STATE;
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="john.doe@gmail.com"
              onChange={(ev) =>
                setUserState((prevState) => {
                  const UPDATED_STATE = { ...prevState };
                  UPDATED_STATE.email = ev.target.value;
                  return UPDATED_STATE;
                })
              }
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*********"
                  onChange={(ev) =>
                    setUserState((prevState) => {
                      const UPDATED_STATE = { ...prevState };
                      UPDATED_STATE.password = ev.target.value;
                      return UPDATED_STATE;
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*********"
                  onChange={(ev) =>
                    setUserState((prevState) => {
                      const UPDATED_STATE = { ...prevState };
                      UPDATED_STATE.confirmPassword = ev.target.value;
                      return UPDATED_STATE;
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <p>
            Already have an account? <Link to={"/login"}>Log in</Link>
          </p>
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: "10px" }}
          >
            Sign up
          </Button>
          {error && (
            <Button variant="danger" disabled>
              Oooopss! An Error Occured.
            </Button>
          )}
        </React.Fragment>
      )}
    </Form>
  );
};

export default Register;
