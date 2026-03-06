import { NavLink } from 'react-router-dom';

const MenuNavLink = ({ name, path, collapseMenu}) => {
  return (
    <li key={name} className='nav-item'>
        <NavLink className="nav-link" to={path} onClick={collapseMenu}>{name}</NavLink>
    </li>
  );
};

export default MenuNavLink;