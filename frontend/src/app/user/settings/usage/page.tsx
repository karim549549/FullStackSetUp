"use client";

import { motion } from "framer-motion";
import { Heart, Activity, TrendingUp } from "lucide-react";
import { settingsSections } from "@/lib/constants/settings";
import { Setting } from "@/lib/types/settings.types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Mock data for the last 7 days
const usageData = [
  { date: 'Mon', activeTime: 45, workouts: 2, calories: 1800 },
  { date: 'Tue', activeTime: 30, workouts: 1, calories: 2200 },
  { date: 'Wed', activeTime: 60, workouts: 3, calories: 1900 },
  { date: 'Thu', activeTime: 40, workouts: 2, calories: 2100 },
  { date: 'Fri', activeTime: 50, workouts: 2, calories: 2000 },
  { date: 'Sat', activeTime: 90, workouts: 4, calories: 2300 },
  { date: 'Sun', activeTime: 35, workouts: 1, calories: 1950 },
];

const subscriptionData = [
  { date: 'Mon', premium: 120, basic: 85 },
  { date: 'Tue', premium: 125, basic: 82 },
  { date: 'Wed', premium: 130, basic: 80 },
  { date: 'Thu', premium: 128, basic: 83 },
  { date: 'Fri', premium: 132, basic: 78 },
  { date: 'Sat', premium: 135, basic: 75 },
  { date: 'Sun', premium: 138, basic: 72 },
];

export default function UsagePage() {
  const sections = settingsSections.usage;

  const renderSetting = (setting: Setting) => {
    if (setting.type === "toggle") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  setting.default ? "bg-primary" : "bg-muted"
                } ${setting.comingSoon ? "blur-[0.5px] opacity-50" : ""}`}
                disabled={setting.comingSoon}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    setting.default ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </TooltipTrigger>
            {setting.comingSoon && (
              <TooltipContent side="left" className="text-xs">
                Coming Soon
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Usage Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
        <div className="relative bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Usage Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekly Activity Chart */}
            <div className="bg-card rounded-lg p-4">
              <h3 className="text-sm font-medium mb-4">Weekly Activity</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="activeTime" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="workouts" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subscription Growth Chart */}
            <div className="bg-card rounded-lg p-4">
              <h3 className="text-sm font-medium mb-4">Subscription Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subscriptionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <RechartsTooltip />
                    <Bar dataKey="premium" fill="#8884d8" />
                    <Bar dataKey="basic" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="relative bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Alert className="bg-primary/10 border-primary/20">
                <Heart className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Thank You for Contributing!</AlertTitle>
                <AlertDescription className="text-primary/90">
                  Your anonymous usage data helps us improve our AI models and provide better diet recommendations for everyone. We appreciate your contribution to making our service better.
                </AlertDescription>
              </Alert>
            </motion.div>

            <div className="space-y-6">
              {section.settings.map((setting) => (
                <div key={setting.label} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{setting.label}</h3>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  {renderSetting(setting)}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 