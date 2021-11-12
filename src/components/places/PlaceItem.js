import Card from '../UIs/Card';
import { Link } from 'react-router-dom';

const PlaceItem = ({ id, image, title, address, description }) => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={image} alt={title} />
        </div>
        <div className="place-item__info">
          <h2>{title}</h2>
          <h4>{address}</h4>
          <p>{description}</p>
        </div>
        <div className="place-item__actions">
          <button className="btn">VIEW ON MAP</button>
          <Link className="btn btn--blue" to={`/places/${id}`}>EDIT</Link>
          <button className="btn btn--red">DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;