import { NavLink } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import {  UserCircleIcon } from "@heroicons/react/24/outline";

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

// assets
import logo from "../assets/logo.svg";

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };



  const handleClick = () => {
    logout()
    console.log("logged out");
  }



  return (
    <div className="font-roboto-slab shadow sm:mb-4">
      <nav className="container max-w-[100rem] mx-auto px-3 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} width={32} />
        </NavLink>

        <div className="flex justify-between gap-6 font-medium">
          {!user ? (
            <>
              {/* <NavLink className="hover:text-teal-500" to="signup" >Sign up</NavLink> */}
              <NavLink className="hover:text-teal-500" to="signin">
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="flex items-center gap-2 hover:text-teal-500" to="profile">
                <UserCircleIcon width={20}/>
               <span>Profile</span> 
              </NavLink>

              <button
                onClick={logout}
                className="flex items-center gap-2 hover:text-teal-500"
              >
                <ArrowRightOnRectangleIcon width={20} />
                <span>Logout</span>
              </button>
            </>


          )}
        </div>
      </nav>
    </div>
  )
}
export default Navbar