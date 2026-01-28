import { BrowserRouter, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { Route } from "react-router-dom"
import Home from "./pages/home/Home"

function App() {
  const BASE_URL =  "/seguro-carro-front";

  return (
    <>
      <BrowserRouter basename={BASE_URL}>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
