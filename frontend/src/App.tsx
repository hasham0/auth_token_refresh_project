import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import AuthProviders from "./providers/AuthContext/AuthProviders";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <AuthProviders>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Layout />}
            >
              <Route
                index
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProviders>
    </>
  );
}

export default App;
