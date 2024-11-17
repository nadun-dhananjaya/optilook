import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/ROUTES";
import ScanFacePage from "./pages/ScanFace/ScanFacePage";
import SplashPage from "./pages/Splash/SplashPage";
import Layout from "./layout/layout";
import FaceProfilePage from "./pages/FaceProfile/FaceProfilePage";
import EyeGlassPage from "./pages/Eyeglass/EyeGlassPage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES?.HOME} element={<SplashPage />} />
            <Route path={ROUTES?.SCAN_FACE} element={<ScanFacePage />} />
            <Route path={ROUTES?.FACE_PROFILE} element={<FaceProfilePage />} />
            <Route path={ROUTES?.EYE_GLASS} element={<EyeGlassPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
