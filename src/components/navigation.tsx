import { NavLink } from "react-router";

export const Navigation = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "localidades", path: "/localidades" },
  ];

  return (
    <aside className="flex flex-col bg-gray-800 md:min-w-[10vw]  md:min-h-screen">
      <h2 className="text-white text-2xl font-bold text-center mt-8 mb-8">Menu</h2>
      <nav className="text-white flex flex-col w-full">
        {
          links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={
                ({ isActive }) =>
                  `text-xl font-bold 
                ${isActive ? "text-blue-500 bg-white" : "bg-blue-700"} 
                hover:text-white hover:bg-blue-600 transition-colors duration-200 py-2 px-4`
              }
            >
              {link.name}
            </NavLink>
          ))
        }
      </nav>
    </aside>
  );
};
