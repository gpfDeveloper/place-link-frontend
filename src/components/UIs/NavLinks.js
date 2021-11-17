import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router";

const NavLinks = ({ classes }) => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  let className = "nav-links";
  if (classes) {
    className = classes;
  }
  const logoutHandler = () => {
    logout();
    navigate("/");
  };
  return (
    <ul className={className}>
      <li>
        <Link to="/">Home</Link>
      </li>
      {!isLoggedIn && (
        <li>
          <Link to="/authenticate">Sign In</Link>{" "}
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Link to={`/${userId}/places`}>My Places</Link>{" "}
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Link to="/places/new">Add Place</Link>{" "}
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button className="btn btn--outline" onClick={logoutHandler}>
            Logout
          </button>{" "}
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
