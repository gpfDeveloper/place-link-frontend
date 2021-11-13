import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router";

const NavLinks = ({ classes }) => {
  const { isAuth, logout } = useContext(AuthContext);
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
      {!isAuth && (
        <li>
          <Link to="/authenticate">Sign Up</Link>{" "}
        </li>
      )}
      {isAuth && (
        <li>
          <Link to="/u1/places">My Places</Link>{" "}
        </li>
      )}
      {isAuth && (
        <li>
          <Link to="/places/new">Add Place</Link>{" "}
        </li>
      )}
      {isAuth && (
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
