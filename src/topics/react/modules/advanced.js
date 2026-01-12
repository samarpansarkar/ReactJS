import { lazy } from "react";
import { MoreHorizontal, Layout, Terminal } from "lucide-react";

// Lazy Load Components
const UseImperativeHandleDemo = lazy(() =>
  import("../components/UseImperativeHandleDemo")
);
const UseLayoutEffectDemo = lazy(() =>
  import("../components/UseLayoutEffectDemo")
);
const UseDebugValueDemo = lazy(() => import("../components/UseDebugValueDemo"));

export const advancedHooks = [
  {
    id: "useimperativehandle",
    icon: MoreHorizontal,
    title: "useImperativeHandle",
    category: "advanced",
    description: "Customize the instance value exposed to parent refs",
    component: UseImperativeHandleDemo,
    theory: {
      overview:
        "Customizes the instance value that is exposed to parent components when using `forwardRef`.",
      deepDive:
        "Usually, you don't want to expose the *entire* DOM node to a parent (encapsulation). This hook lets you return a custom object with only specific methods (like `focus()` or `reset()`) instead of the raw DOM node.",
      whenToUse: [
        "When you need to imperatively trigger functions in a child (e.g. `modalRef.current.open()`)",
        "Library authors designing strict APIs",
      ],
      syntax: `useImperativeHandle(ref, () => ({
  focus: () => {
    inputRef.current.focus();
  }
}));`,
      tips: [
        "Avoid using refs for data flow; prefer props",
        "Must be used with `forwardRef`",
      ],
      commonPitfalls: [
        "Overusing imperative code in a declarative library (React)",
      ],
    },
  },
  {
    id: "uselayouteffect",
    icon: Layout,
    title: "useLayoutEffect",
    category: "advanced",
    description: "Fires synchronously after DOM mutations",
    component: UseLayoutEffectDemo,
    theory: {
      overview:
        "Identical to useEffect, but fires synchronously after DOM mutations but before the browser paints.",
      deepDive:
        "useEffect runs *after* the paint, which is good for performance. useLayoutEffect blocks the paint. Use it when you need to measure the DOM (width/height/scroll) and immediately mutate it (e.g. tooltip positioning) to prevent visual flickering.",
      whenToUse: [
        "Measuring DOM elements (getBoundingClientRect)",
        "Animating layout (FLIP animations)",
        "preventing visual flashes/flickers",
      ],
      syntax: `useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setHeight(height);
}, []);`,
      tips: [
        "Prefer useEffect (99% of cases)",
        "Runs synchronously so it hurts Performance",
      ],
      commonPitfalls: [
        "Using for data fetching (blocks UI)",
        "Using extensively triggers jank",
      ],
    },
  },
  {
    id: "usedebugvalue",
    icon: Terminal,
    title: "useDebugValue",
    category: "advanced",
    description: "Display a label for custom hooks in React DevTools",
    component: UseDebugValueDemo,
    theory: {
      overview:
        "Can be used to display a label for custom hooks in React DevTools.",
      deepDive:
        "It has zero effect on the application logic. It's purely for developer experience. If you have a custom hook `useOnlineStatus`, you can make DevTools show 'Online' next to it instead of inspecting internal state.",
      whenToUse: [
        "Variables in custom hooks that describe the hook's status",
        "Library authors providing debug info",
      ],
      syntax: `useDebugValue(isOnline ? 'Online' : 'Offline');
// With formatter function (for expensive calc)
useDebugValue(date, date => date.toDateString());`,
      tips: ["Don't use in every hook; mostly useful for shared/library hooks"],
      commonPitfalls: ["Expecting it to render something in the DOM"],
    },
  },
];
