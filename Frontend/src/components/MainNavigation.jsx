import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';
import { cn } from '../util/lib';

function MainNavigation() {
  const token = useRouteLoaderData('root');
  return (
    <header className={ `text-xl min-w-screen   ${classes.header} bg-gray-900 w-screen`}
    >
      <nav className='flex pl-40' >
        <ul className={`space-x-5 ${classes.list}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {!token && <li>
            <NavLink
              to="/auth/?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Authentication
            </NavLink>
          </li>}
          
          {token && <li>
            <Form action='/logout' method='post'>
              <button>
                Logout
              </button>
            </Form>
          </li>}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
