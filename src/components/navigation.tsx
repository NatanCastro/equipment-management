import { NavLink } from "react-router";

export const Navigation = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "localidades", path: "/localidades" },
  ];

  return (
    <aside className="flex flex-col bg-background-secondary md:min-w-[10vw] md:min-h-screen">
      <h2 className="text-primary text-2xl font-bold text-center mt-8 mb-8">Menu</h2>
      <nav className="text-foreground flex flex-col w-full">
        {
          links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={
                ({ isActive }) =>
                  `text-xl font-bold
                ${isActive ? "bg-background-secondary text-primary" : "bg-primary text-foreground"}
                hover:text-primary-foreground hover:bg-primary-dark transition-colors duration-200 py-2 px-4`
              }
            >
              {link.name}
            </NavLink>
          ))
        }
      </nav>
    </aside>
  )
};
