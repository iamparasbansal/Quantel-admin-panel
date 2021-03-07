import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../static/Navbar.css';

const Navbar=({handleLogout})=>{

  return (
    <>
        <div className='navbar'>
          <Link to='/' className='menu-bars'>
            <FaIcons.FaBars/>
          </Link>
          <div className="Navbar-Brand-title">
              <h2>Quantel</h2>
          </div> 
      </div>
    </>
  );
}

export default Navbar;