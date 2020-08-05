import React from 'react';
import './navbar.css'
const NavbarToggle = ({ active, menuState }) => {
  return (
    <div className='block md:hidden '>
      <button
        className={`focus:outline-none menu-icon ${
          active ? 'menu-icon--isActive' : ''
        } ml-4 self-center cursor-pointer `}
        onClick={menuState}
      >
        <div className='menu-icon__bar'></div>
        <div className='menu-icon__bar'></div>
        <div className='menu-icon__bar'></div>
      </button>
    </div>
  );
};

export default NavbarToggle;
