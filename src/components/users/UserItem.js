import Avatar from "../UIs/Avatar";
import Card from "../UIs/Card";
import { Link } from "react-router-dom";

const UserItem = ({ id, image, name, placeCount }) => {
  return (
    <li className="user-item">
      <Card>
        <Link className="user-item__content" to={`/${id}/places`}>
          <Avatar image={image} alt={name}/>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
