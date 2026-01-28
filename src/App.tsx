import { BrowserRouter, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"

function App() {
  const BASE_URL = import.meta.env.PROD ? "/seguro-carro-front" : "/";

        </Routes>
         <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
