import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Users from "./pages/Users";
import UserPlaces from "./pages/UserPlaces";
import Authenticate from "./pages/Authenticate";
import { AuthContextProvider } from "./context/auth-context";
import NewPlace from "./pages/NewPlace";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:uid/places" element={<UserPlaces />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/authenticate" element={<Authenticate />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
