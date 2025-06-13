"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Calendar 
} from "lucide-react";

const stats = [
  {
    title: "Active Diet Plans",
    value: "2",
    icon: Target,
    color: "from-violet-500/20 to-violet-500/5"
  },
  {
    title: "Calories Today",
    value: "1,850",
    icon: Activity,
    color: "from-emerald-500/20 to-emerald-500/5"
  },
  {
    title: "Progress",
    value: "+2.5kg",
    icon: TrendingUp,
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    title: "Next Meal",
    value: "2h 30m",
    icon: Calendar,
    color: "from-amber-500/20 to-amber-500/5"
  }
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-neutral-400">{stat.title}</h3>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <p className="text-sm text-neutral-400">No recent activity</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Upcoming Meals</h2>
              <div className="space-y-4">
                <p className="text-sm text-neutral-400">No upcoming meals scheduled</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 