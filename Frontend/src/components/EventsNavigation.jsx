import { NavLink, useLocation, useRouteLoaderData } from "react-router-dom";

function EventsNavigation() {
  const token = useRouteLoaderData("root");
  const location = useLocation();

  return (
    <header className="w-full bg-gray-800 text-white">
      <nav className="mx-auto max-w-7xl px-4 py-3">
        <ul className="flex flex-wrap items-center gap-4 text-base sm:text-lg">

          {/* Show "All Events" when inside /events OR any nested event routes */}
          {location.pathname.startsWith("/events") && (
            <li>
              <NavLink
                to="/events"
                end
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "hover:text-yellow-300"
                }
              >
                All Events
              </NavLink>
            </li>
          )}

          {/* Show New Event only if logged in */}
          {token && (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "hover:text-yellow-300"
                }
              >
                New Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
