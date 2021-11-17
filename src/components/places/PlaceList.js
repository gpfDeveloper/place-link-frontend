import Card from "../UIs/Card";
import PlaceItem from "./PlaceItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

const PlaceList = ({ items, onDeletePlace }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (items.length === 0) {
    if (isLoggedIn) {
      return (
        <div className="place-list center">
          <Card>
            <h2>No places found. Maybe create one?</h2>
            <Link to="/places/new" className="btn mt-2">
              Create Place
            </Link>
          </Card>
        </div>
      );
    }
    else {
      return (
        <div className="place-list center">
          <Card>
            <h2>No places found for the current user.</h2>
          </Card>
        </div>
      ); 
    }
  }

  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
