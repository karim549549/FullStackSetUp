"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Utensils, 
  User, 
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Inbox,
  Bell,
  Activity,
  UserCircle,
  Salad,
  Soup
} from "lucide-react";
import { useAuthStore } from "@/services/stores/authStore";
import Logo from "@/components/custom/Logo";
import ThemeSwitch from "@/components/custom/ThemeSwitch";
import UserAvatar from "@/components/custom/UserAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/user/analytics",
    icon: BarChart3,
  },
  {
    title: "Diet & Recipe",
    icon: Utensils,
    subItems: [
      {
        title: "Diets",
        href: "/user/diet-recipe/diets",
        icon: Salad,
      },
      {
        title: "Recipes",
        href: "/user/diet-recipe/recipes",
        icon: Soup,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    subItems: [
      {
        title: "Notifications",
        href: "/user/settings/notifications",
        icon: Bell,
      },
      {
        title: "Account",
        href: "/user/settings/account",
        icon: User,
      },
      {
        title: "Usage",
        href: "/user/settings/usage",
        icon: Activity,
      },
    ],
  },
  {
    title: "Profile",
    href: "/user/profile",
    icon: UserCircle,
  },
];

// Function to generate breadcrumb items
const generateBreadcrumbs = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean);
  // Remove 'user' from the paths if it exists
  const filteredPaths = paths.filter(path => path !== 'user');
  
  const breadcrumbs = filteredPaths.map((path, index) => {
    // Reconstruct the href including 'user' segment
    const href = `/user/${filteredPaths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    return { href, label };
  });
  return breadcrumbs;
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const breadcrumbs = generateBreadcrumbs(pathname);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-background/50 backdrop-blur-xl border-b border-border z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDrawer}
              className="p-2 hover:bg-accent rounded-lg transition-colors md:hidden"
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitch />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-2 hover:bg-accent rounded-lg transition-colors opacity-50 hover:opacity-100 blur-[0.5px] hover:blur-0">
                    <Inbox className="w-5 h-5 text-sky-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-sky-950/90 backdrop-blur-sm border-sky-800/50">
                  <p className="text-sky-200">Coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <UserAvatar />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        {/* Mobile Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleDrawer}
                className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed top-0 left-0 h-full w-64 bg-zinc-900/95 border-r border-zinc-800/50 z-50 md:hidden"
              >
                <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800/50">
                  <span className="text-lg font-semibold text-zinc-100">Menu</span>
                  <button
                    onClick={toggleDrawer}
                    className="p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
                <nav className="p-4 space-y-1">
                  {sidebarItems.map((item) => (
                    <div key={item.title}>
                      {item.subItems ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                                  pathname === subItem.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: isSidebarCollapsed ? "80px" : "256px"
          }}
          transition={{ duration: 0.2 }}
          className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] dark:bg-zinc-900/95 bg-neutral-200 border-r border-zinc-800/50"
        >
          <div className="relative h-full">
            <nav className="p-4 space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title}>
                  {item.subItems ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
                        <item.icon className="w-4 h-4" />
                        {!isSidebarCollapsed && (
                          <span className="text-sm font-medium">{item.title}</span>
                        )}
                      </div>
                      {!isSidebarCollapsed && (
                        <div className="pl-4 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                                pathname === subItem.href
                                  ? "bg-sky-500/10 text-sky-500"
                                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              }`}
                            >
                              <subItem.icon className="w-4 h-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                        pathname === item.href
                          ? "bg-sky-500/10 text-sky-500"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isSidebarCollapsed && <span>{item.title}</span>}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <button
              onClick={toggleSidebar}
              className="absolute -right-3 top-6 p-1.5 rounded-full bg-neutral-200 dark:bg-zinc-900 border border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              )}
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={false}
          animate={{
            marginLeft: isSidebarCollapsed ? "80px" : "256px"
          }}
          transition={{ duration: 0.2 }}
          className="flex-1 pt-16 min-h-screen"
        >
          {/* Breadcrumbs */}
          <div className="px-6 py-4 border-b border-zinc-800/50">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {children}
        </motion.main>
      </div>
    </div>
  );
} 