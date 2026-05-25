
import { SidebarNav } from "./SideBarNav"
import { SideBarItem } from "./SidebarItem"
import { icons } from "./SidebarIcons";


export default function Sidebar() {


    return (
        <div className="sidebar">
             {SidebarNav.map(item => (
            <SideBarItem
                key={item.id}
                icon={icons[item.icon]}
                label={item.label}
                path={item.path} />
        ))}
        </div>
       
   
    )
    
}