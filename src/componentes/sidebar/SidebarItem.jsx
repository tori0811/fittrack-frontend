
import { NavLink } from 'react-router-dom'
import './sidebar.css';

export function SideBarItem( { icon, path, label } ) {

    return (
        <NavLink to={path} className="sidebar-item">
            {icon}
            <span className="sidebar-tooltip">{label}</span>
        </NavLink>
        
    )
}