import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

interface SidebarItemProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  end?: boolean;
}

const SidebarItem = ({ href, icon, children, end }: SidebarItemProps) => {
  return (
    <NavLink to={href} end={end}>
      {({ isActive }) => (
        <div
          className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {icon && (
            <span
              className={`flex-shrink-0 ${
                isActive ? "text-primary dark:text-primary" : ""
              }`}
            >
              {icon}
            </span>
          )}
          <span>{children}</span>
        </div>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const getAvatarName = () => {
    if (user?.given_name && user?.family_name) {
      return `${user.given_name} ${user.family_name}`;
    }
    return user?.preferred_username || user?.email || "";
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    // Main
    {
      title: "Main",
      items: [
        {
          label: "Dashboard",
          icon: <HiOutlineHome className="w-6 h-6" />,
          href: "/dashboard",
          end: true,
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

  if (isLoading) {
    return (
      <div className="h-full bg-white dark:bg-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      {/* User Profile Section */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <img
            src={
              user?.profile_pic ||
              `https://ui-avatars.com/api/?name=${getAvatarName()}`
            }
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${getAvatarName()}`;
            }}
          />
          <div>
            <h2 className="text-sm font-semibold">{getAvatarName()}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {/* {user?.role || "User"} */}
              Administrator
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-8">
        {menuItems.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {group.title}
            </h3>
            {group.items.map((item, itemIdx) => (
              <SidebarItem
                key={itemIdx}
                href={item.href}
                icon={item.icon}
                end={item.end}
              >
                {item.label}
              </SidebarItem>
            ))}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <HiOutlineLogout className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
