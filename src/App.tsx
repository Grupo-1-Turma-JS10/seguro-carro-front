import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  const BASE_URL = import.meta.env.PROD ? "/seguro-carro-front" : "/";

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
