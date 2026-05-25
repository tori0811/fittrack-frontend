
import { ClienteSidebarNav } from './ClienteSidebarNav';
import { SideBarItem } from '../../../../componentes/sideBar/SidebarItem';
import { icons } from '../../../../componentes/sideBar/SidebarIcons';

export default function ClienteSidebar() {
    return (
        <div className="sidebar">
            {ClienteSidebarNav.map(item => (
                <SideBarItem
                    key={item.id}
                    icon={icons[item.icon]}
                    label={item.label}
                    path={item.path}
                />
            ))}
        </div>
    );
}
