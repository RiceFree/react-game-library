import { Link } from "react-router";
import GenresDropdown from "./GenresDropdown";

export function SidebarGame() {
  return (
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-100 text-base-content min-h-full w-60 p-4">
            <li className="lg:hidden">
              <Link to={`/`} className="text-lg font-pixelify">React Game Library</Link>
            </li>
            <li>
              <GenresDropdown />
            </li>
        </ul>
      </div>
  );
}
