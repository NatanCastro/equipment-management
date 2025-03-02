import { Navigation } from "@/components"
import { Outlet } from "react-router"

export const Layout: React.FC = () => {
	return (
		<div className="flex min-h-screen dark">
			<Navigation />
			<div className="flex-1 flex flex-col">
				<Outlet />
			</div>
		</div>
	)
}
