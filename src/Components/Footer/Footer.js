import { useContext } from "react";
import AuthContext from "../../Store/auth_context";

const Footer = () => {
  const ctx = useContext(AuthContext);
  const handleLogOut = () => {
    localStorage.removeItem("token");
  }
  return <div><button onClick={handleLogOut}>Log out</button></div>;
};

export default Footer;
