import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
