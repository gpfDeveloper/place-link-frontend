import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router";

const NavLinks = ({ classes }) => {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  let className = "nav-links";
  if (classes) {
    className = classes;
  }
  const logoutHandler = () => {
    logout();
    navigate('/');
  };
  return (
    <ul className={className}>
      <li>
        <Link to="/">Home</Link>
      </li>
      {!isAuth && (
        <li>
          <Link to="/authenticate">Authenticate</Link>{" "}
        </li>
      )}
      {isAuth && (
        <li>
          <Link to="/places/new">New Place</Link>{" "}
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
