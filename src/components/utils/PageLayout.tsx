import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { SideNav } from "./SideNav";

export function PageLayout() {
  return (
    <>
      <Nav />
      <div className="flex overflow-auto flex-col pt-10 h-screen text-xl text-white bg-gray-800 pt-36">
        <div className={"flex flex row items-center relative"}>
          <SideNav />
          <main className={"basis-4/6"}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
