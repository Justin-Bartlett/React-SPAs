import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

import classes from "./MainNavigation.module.css"

const MainNavigation = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className={classes.header}>
      <div className={classes.logo}>RCDS</div>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            {isAuthenticated ? (
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/admin"
              >
                Admin
              </NavLink>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/login"
              >
                Login
              </NavLink>
            )}
          </li>
          {isAuthenticated ? (
            <li>
              <button type="button" onClick={logout}>
                Sign out
              </button>
            </li>
          ) : (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/register"
              >
                Register
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/competition"
            >
              Competition
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/choreo-or-commercial"
            >
              Choreo or Commercial
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/popping"
            >
              Popping
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/kids-breakin"
            >
              Kids Breakin
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/beginner-choreo"
            >
              Beginner Choreo or Commercial
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/kids-streetdance"
            >
              Kids Streetdance
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/house"
            >
              House
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/adults-beginner-streetdance"
            >
              Adults Beginner Streetdance
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/hiphop"
            >
              Hip hop
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/crc-crew-training"
            >
              CRC Crew Training
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/rc-company-training"
            >
              RC Company Training
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
