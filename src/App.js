import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CanvasPage from "./pages/canvas";
import RegisterUser from "./pages/registerUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/canvas/:id" element={<CanvasPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;