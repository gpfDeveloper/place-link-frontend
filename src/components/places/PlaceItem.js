import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../UIs/Card";
import Modal from "../UIs/Modal";
import Map from "../UIs/Map";

const PlaceItem = ({ id, image, title, address, description, coordinates }) => {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeMapHandler = () => setShowMap(false);
  const openMapHandler = () => setShowMap(true);

  const openDeleteModalHandler = () => setShowDeleteModal(true);
  const cancelDeleteModalHandler = () => setShowDeleteModal(false);
  const confirmDeleteModalHandler = () => setShowDeleteModal(false);

  return (
    <>
      <Modal
        isShow={showMap}
        header={address}
        actions={
          <button className="btn btn--blue" onClick={closeMapHandler}>
            CLOSE
          </button>
        }
      >
        <Map center={coordinates} zoom={16} />
      </Modal>
      <Modal
        className="modal--delete"
        isShow={showDeleteModal}
        header={"Are you sure?"}
        actions={
          <>
            <button
              className="btn btn--blue"
              onClick={cancelDeleteModalHandler}
            >
              CANCEL
            </button>
            <button
              className="btn btn--red"
              onClick={confirmDeleteModalHandler}
            >
              DELETE
            </button>
          </>
        }
      >
        <h4 className="center">
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </h4>
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
            <button className="btn btn--red" onClick={openDeleteModalHandler}>
              DELETE
            </button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
