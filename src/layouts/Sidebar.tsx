import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineShieldCheck,
  HiOutlineLogout,
} from "react-icons/hi";

const Sidebar = () => {
  const menuItems = [
    // Main
    {
      title: "Main",
      items: [
        {
          label: "Dashboard",
          icon: <HiOutlineHome className="w-6 h-6" />,
          href: "/dashboard",
        },
        {
          label: "Books",
          icon: <HiOutlineBookOpen className="w-6 h-6" />,
          href: "/dashboard/books",
        },
        {
          label: "Users",
          icon: <HiOutlineUsers className="w-6 h-6" />,
          href: "/dashboard/users",
        },
        {
          label: "Analytics",
          icon: <HiOutlineChartBar className="w-6 h-6" />,
          href: "/dashboard/analytics",
        },
      ],
    },
    // Settings & Support
    {
      title: "Settings & Support",
      items: [
        {
          label: "Settings",
          icon: <HiOutlineCog className="w-6 h-6" />,
          href: "/dashboard/settings",
        },
        {
          label: "Help Center",
          icon: <HiOutlineQuestionMarkCircle className="w-6 h-6" />,
          href: "/dashboard/help",
        },
        {
          label: "Privacy",
          icon: <HiOutlineShieldCheck className="w-6 h-6" />,
          href: "/dashboard/privacy",
        },
      ],
    },
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      {/* User Profile Section */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=XXXXXXXXXXXXXXXXXXXX&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-sm font-semibold">John Doe</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Administrator
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-8">
        {menuItems.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {group.title}
            </h3>
            {group.items.map((item, itemIdx) => (
              <SidebarItem key={itemIdx} href={item.href} icon={item.icon}>
                {item.label}
              </SidebarItem>
            ))}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t dark:border-gray-700">
        <button
          onClick={() => {
            /* Add logout handler */
          }}
          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <HiOutlineLogout className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
}

const SidebarItem = ({ href, icon, children }: SidebarItemProps) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? "bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-500"
            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};

export default Sidebar;