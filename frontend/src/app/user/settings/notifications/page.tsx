"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { settingsSections } from "@/lib/constants/settings";
import { Setting } from "@/lib/types/settings.types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function NotificationsPage() {
  const sections = settingsSections.notifications;

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
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We're working on bringing you a better notification system
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            </div>

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