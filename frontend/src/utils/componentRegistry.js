import { lazy } from "react";
import * as LucideIcons from "lucide-react";

// Import all demo components here or use lazy loading if possible
// NOTE: Dynamic imports with variables require specific paths in Vite/Webpack
// So we manually map them here.

const UseStateDemo = lazy(() =>
  import("../topics/react/components/UseStateDemo")
);

const UseEffectDemo = lazy(() =>
  import("../topics/react/components/UseEffectDemo")
);
// Add other demos here as you create them

// We don't really need a manual registry if we import * as LucideIcons
// But keeping a list of "suggested" or "common" icons could be useful if we wanted a dropdown helper later.
export const iconRegistry = LucideIcons;

export const componentRegistry = {
  UseStateDemo,
  UseEffectDemo,
};

export const getIcon = (iconName) => {
  // Access the icon from the LucideIcons object
  // Fallback to Box if not found
  const IconComponent = LucideIcons[iconName];
  return IconComponent || LucideIcons.Box;
};

export const getComponent = (componentName) => {
  return componentRegistry[componentName] || null;
};
