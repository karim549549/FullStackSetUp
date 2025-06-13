import { Bell, Lock, Globe, User, Activity } from "lucide-react";
import { SettingsSections } from "../types/settings.types";

export const settingsSections: SettingsSections = {
  notifications: [
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        {
          label: "Email Notifications",
          description: "Receive email updates about your diet plans",
          type: "toggle",
          default: true
        },
        {
          label: "Push Notifications",
          description: "Get notified about upcoming meals",
          type: "toggle",
          default: true
        }
      ]
    }
  ],
  account: [
    {
      title: "Privacy",
      icon: Lock,
      settings: [
        {
          label: "Email Address",
          description: "Your current email address",
          type: "email"
        },
        {
          label: "Change Password",
          description: "Update your account password",
          type: "password"
        },
        {
          label: "Profile Visibility",
          description: "Make your profile visible to other users",
          type: "toggle",
          default: false,
          comingSoon: true
        },
        {
          label: "Share Progress",
          description: "Allow sharing your progress on social media",
          type: "toggle",
          default: false,
          comingSoon: true
        }
      ]
    },
    {
      title: "Preferences",
      icon: Globe,
      settings: [
        {
          label: "Language",
          description: "Select your preferred language",
          type: "select",
          options: ["English", "Spanish", "French", "German"],
          default: "English",
          comingSoon: true
        },
        {
          label: "Theme",
          description: "Choose your preferred theme",
          type: "theme",
          default: "dark"
        }
      ]
    }
  ],
  usage: [
    {
      title: "Usage Statistics",
      icon: Activity,
      settings: [
        {
          label: "Data Collection",
          description: "Allow collection of usage data to improve your experience",
          type: "toggle",
          default: true
        },
        {
          label: "Analytics",
          description: "Share anonymous usage data for analytics",
          type: "toggle",
          default: true
        }
      ]
    }
  ]
}; 