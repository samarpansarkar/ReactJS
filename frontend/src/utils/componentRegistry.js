import * as LucideIcons from "lucide-react";

export const iconRegistry = LucideIcons;

export const getIcon = (iconName) => {
  const IconComponent = LucideIcons[iconName];
  return IconComponent || LucideIcons.Box;
};
