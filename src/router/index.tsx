import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/pages/home";
import { Layout } from "@/layout";

export default function Router() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}
