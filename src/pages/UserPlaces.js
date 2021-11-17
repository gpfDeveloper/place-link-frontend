import PlaceList from "../components/places/PlaceList";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/use-http";
import ErrorModal from "../components/UIs/ErrorModal";
import LoadingSpinner from "../components/UIs/LoadingSpinner";

const UserPlaces = () => {
  const uid = useParams().uid;
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${uid}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, uid]);

  const placeDeletedHandler = (pid) => {
    setLoadedPlaces((prev) => prev.filter((place) => place.id !== pid));
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center mb-4 mt-4">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;
