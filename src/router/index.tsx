import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/home";
import CreateEquipment from "../pages/create-equipement";

export default function Router() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment/create" element={<CreateEquipment />} />
      </Routes>
    </BrowserRouter>

  )
}
