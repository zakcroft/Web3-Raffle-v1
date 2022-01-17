import { NavLink } from "react-router-dom";

export function SideNav() {
  return (
    <>
      <nav className={"p-4 border-solid border-r-2"}>
        <NavLink
          className={`block m-5 hover:text-amber-300 hover:underline ${({
            isActive,
          }: {
            isActive: Boolean;
          }) => (isActive ? "red" : "blue")}`}
          to={`./side-nav`}
        >
          Side Nav
        </NavLink>
      </nav>
    </>
  );
}
