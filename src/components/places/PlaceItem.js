import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../UIs/Card";
import Modal from "../UIs/Modal";

const PlaceItem = ({ id, image, title, address, description }) => {
  const [showMap, setShowMap] = useState(false);
  const closeMapHandler = () => setShowMap(false);
  const openMapHandler = () => setShowMap(true);
  return (
    <>
      <Modal
        isShow={showMap}
        onCancel={closeMapHandler}
        header={address}
        actions={<button className="btn btn--blue" onClick={closeMapHandler}>CLOSE</button>}
      >
        <div className="map-container">
          <h2>MAP</h2>
        </div>
      </Modal>
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
            <button className="btn" onClick={openMapHandler}>
              VIEW ON MAP
            </button>
            <Link className="btn btn--blue" to={`/places/${id}`}>
              EDIT
            </Link>
            <button className="btn btn--red">DELETE</button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
