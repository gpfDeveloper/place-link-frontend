import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Users from "./pages/Users";
import UserPlaces from "./pages/UserPlaces";
import Authenticate from "./pages/Authenticate";
import { AuthContextProvider } from "./contexts/auth-context";
import NewPlace from "./pages/NewPlace";
import UpdatePlace from "./pages/UpdatePlace";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:uid/places" element={<UserPlaces />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/:pid" element={<UpdatePlace />} />
            <Route path="/authenticate" element={<Authenticate />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
