import { Layout } from "@/layout"
import LoadingScreen from "@/pages/loading"
import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

const Home = React.lazy(() => import("@/pages/home"))
const Locations = React.lazy(() => import("@/pages/locations"))

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
		</BrowserRouter>
	)
}
