import { NavLink } from 'react-router-dom';

const MenuNavLink = ({ name, path, collapseMenu, icon = null, className = 'nav-link'}) => {
  return (
    <li className='nav-item'>
      <NavLink className={className} to={path} onClick={collapseMenu}>{icon}{name}</NavLink>
    </li>
  );
};
export default MenuNavLink;