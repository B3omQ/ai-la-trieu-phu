import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Game from "./pages/Game";
import Records from "./pages/Records";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/game" element={<Game />} />
      <Route path="/records" element={<Records />} />
    </Routes>
  );
}


