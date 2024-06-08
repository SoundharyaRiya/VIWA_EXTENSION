import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth_context";

const Home = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("viwa_auth_token"));
    console.log(token);
    if (!token) {
      navigate("/login");
    } else {
      chrome.runtime.sendMessage(
        {
          type: "currentUser",
          token,
        },
        (response) => {
          if (response?.statusCode >= 400) {
            localStorage.removeItem("viwa_auth_token");
            navigate("/login");
          } else {
            ctx.handleSetUser(response.data);
          }
        }
      );
    }
  }, [navigate]);
  return (
    <React.Fragment>
      <h3>Welcome {ctx.userDataState?.firstName},</h3>
      <h6>Your AI assistant is running, go check some webpages!</h6>
    </React.Fragment>
  );
};

export default Home;
