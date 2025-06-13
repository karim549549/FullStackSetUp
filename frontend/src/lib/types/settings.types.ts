import { LucideIcon } from "lucide-react";

export type ToggleSetting = {
  label: string;
  description: string;
  type: "toggle";
  default: boolean;
  comingSoon?: boolean;
};

export type SelectSetting = {
  label: string;
  description: string;
  type: "select";
  options: string[];
  default: string;
  comingSoon?: boolean;
};

export type ThemeSetting = {
  label: string;
  description: string;
  type: "theme";
  default: "light" | "dark";
};

export type EmailSetting = {
  label: string;
  description: string;
  type: "email";
};

export type PasswordSetting = {
  label: string;
  description: string;
  type: "password";
};

export type Setting = ToggleSetting | SelectSetting | ThemeSetting | EmailSetting | PasswordSetting;

export type SettingsSection = {
  title: string;
  icon: LucideIcon;
  settings: Setting[];
};

export type SettingsSections = {
  [key: string]: SettingsSection[];
}; 