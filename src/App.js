import "./styles/main.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/layouts/Layout";
import Users from "./pages/Users";
import UserPlaces from "./pages/UserPlaces";
import Authenticate from "./pages/Authenticate";
import { AuthContext } from "./contexts/auth-context";
import NewPlace from "./pages/NewPlace";
import UpdatePlace from "./pages/UpdatePlace";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);
  let routes;
  if (isAuth) {
    routes = (
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:pid" element={<UpdatePlace />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/authenticate" element={<Authenticate />} />)
        <Route path="/*" element={<Navigate replace to="/authenticate" />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
