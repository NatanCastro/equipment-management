import { Outlet } from "react-router";

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};
