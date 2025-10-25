import { NavLink, useLocation, useRouteLoaderData } from 'react-router-dom';

import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  const token = useRouteLoaderData('root');
  const location = useLocation();
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {location.pathname === `/events` && <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Events
            </NavLink>
          </li>}
          {token && location.pathname === `/events/new` && location.pathname === `/events`  && <li>
            <NavLink
              to="/events/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Event
            </NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
