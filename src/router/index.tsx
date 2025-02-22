import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "@/layout";
import React, { Suspense } from "react";
import LoadingScreen from "@/pages/loading";

const Home = React.lazy(() => import("@/pages/home"));
const Locations = React.lazy(() => import("@/pages/locations"));


export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/localidades" element={<Locations />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter >

  )
}
