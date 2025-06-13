"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, User, Activity } from "lucide-react";

const navItems = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'account', label: 'Account', icon: User },
  { id: 'usage', label: 'Usage', icon: Activity }
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const activeSection = pathname.split('/').pop() || 'notifications';

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4 mb-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(`/user/settings/${item.id}`)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'bg-background/50 text-muted-foreground hover:bg-accent'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        {children}
      </motion.div>
    </div>
  );
} 