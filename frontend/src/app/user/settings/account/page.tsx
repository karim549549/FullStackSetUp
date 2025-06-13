"use client";

import { motion } from "framer-motion";
import { settingsSections } from "@/lib/constants/settings";
import { Setting } from "@/lib/types/settings.types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ThemeSwitch from "@/components/custom/ThemeSwitch";
import { useAuthStore } from "@/services/stores/authStore";
import { EmailChangeDialog } from "@/components/user/settings/EmailChangeDialog";
import { PasswordChangeDialog } from "@/components/user/settings/PasswordChangeDialog";
import { DeleteAccountDialog } from "@/components/user/settings/DeleteAccountDialog";
import { Lock } from "lucide-react";

export default function AccountPage() {
  const sections = settingsSections.account;
  const { user } = useAuthStore();

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
    } else if (setting.type === "select") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <select
                className={`bg-background text-foreground text-sm rounded-lg px-3 py-1.5 border border-input focus:outline-none focus:border-primary/50 ${
                  setting.comingSoon ? "blur-[0.5px] opacity-50" : ""
                }`}
                defaultValue={setting.default}
                disabled={setting.comingSoon}
              >
                {setting.options.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </TooltipTrigger>
            {setting.comingSoon && (
              <TooltipContent side="left" className="text-xs">
                Coming Soon
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      );
    } else if (setting.type === "theme") {
      return <ThemeSwitch />;
    } else if (setting.type === "email") {
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {user?.email || "user@example.com"}
          </span>
          <EmailChangeDialog currentEmail={user?.email || "user@example.com"} />
        </div>
      );
    } else if (setting.type === "password") {
      return <PasswordChangeDialog />;
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
        <div className="relative bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Lock className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Danger Zone</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data
              </p>
              <DeleteAccountDialog />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 