import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../UIs/Card";
import Modal from "../UIs/Modal";
import Map from "../UIs/Map";
import { useHttpClient } from "../../hooks/use-http";
import { AuthContext } from "../../contexts/auth-context";
import ErrorModal from "../UIs/ErrorModal";
import LoadingSpinner from "../UIs/LoadingSpinner";

const PlaceItem = ({
  id,
  image,
  title,
  address,
  description,
  coordinates,
  creatorId,
  onDelete,
}) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeMapHandler = () => setShowMap(false);
  const openMapHandler = () => setShowMap(true);

  const openDeleteModalHandler = () => setShowDeleteModal(true);
  const cancelDeleteModalHandler = () => setShowDeleteModal(false);
  const confirmDeleteModalHandler = async () => {
    setShowDeleteModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
        "DELETE",
        null,
        { Authorization: "Bear " + auth.token }
      );
      onDelete(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
        className="modal--small"
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={title}
            />
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
            {auth.userId === creatorId && (
              <Link className="btn btn--blue" to={`/places/${id}`}>
                EDIT
              </Link>
            )}
            {auth.userId === creatorId && (
              <button className="btn btn--red" onClick={openDeleteModalHandler}>
                DELETE
              </button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
