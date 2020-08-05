import React from 'react';
import { Link } from 'react-router-dom';
const NavItem = ({ link, listStyle, name }) => {
  return (
    <li
      className={`hover:text-primary animate px-3 py-2 rounded-md ${listStyle}`}
    >
      <Link to={link}>
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default NavItem;
