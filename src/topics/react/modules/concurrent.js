import { Activity, Server, Hash, Wifi, Layers } from "lucide-react";
import UseTransitionDemo from "../components/UseTransitionDemo";
import UseDeferredValueDemo from "../components/UseDeferredValueDemo";
import UseIdDemo from "../components/UseIdDemo";
import UseSyncExternalStoreDemo from "../components/UseSyncExternalStoreDemo";
import UseInsertionEffectDemo from "../components/UseInsertionEffectDemo";

export const concurrentHooks = [
  {
    id: "usetransition",
    icon: Activity,
    title: "useTransition",
    category: "concurrent",
    description: "Update state without blocking the UI",
    component: UseTransitionDemo,
    theory: {
      overview:
        "useTransition is a React Hook that lets you update the state without blocking the UI.",
      deepDive:
        "It marks a state update as a 'Transition' (low priority). React will yield to the browser/user input (high priority) while calculating the transition update in the background. Once the calculation is done, it commits the DOM change. This keeps the UI responsive (e.g., typing) while heavy work happens.",
      whenToUse: [
        "Rendering large lists based on input filter",
        "Tab switching that involves heavy rendering",
        "Navigation transitions",
      ],
      syntax: `const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
    // Urgent: update input
    setInputValue(e.target.value);
    
    // Transition: update list
    startTransition(() => {
        setList(filterList(e.target.value));
    });
};`,
      tips: [
        "Check isPending to show a spinner or loading state",
        "Don't use for controlled inputs (typing needs to be urgent)",
      ],
      commonPitfalls: [
        "Using for everything: It adds overhead. Use only for CPU-bound updates.",
        "Assuming it debounces: It doesn't delay starting, it just yields execution.",
      ],
    },
  },
  {
    id: "usedeferredvalue",
    icon: Server,
    title: "useDeferredValue",
    category: "concurrent",
    description: "Defer updating a part of the UI",
    component: UseDeferredValueDemo,
    theory: {
      overview:
        "Accepts a value and returns a new copy of the value that will defer to more urgent updates.",
      deepDive:
        "Similar to useTransition, but wraps a *value* instead of a function. It tells React: 'You can use the old value for a bit while you calculate the new UI with the new value'. Useful when you receive new props but want to keep the old UI responsive.",
      whenToUse: [
        "When you don't control the state setter (e.g. props from parent)",
        "Deferring re-rendering of a heavy part of the tree",
        "Typeahead or search results",
      ],
      syntax: `const deferredValue = useDeferredValue(value);
      
return (
  <Suspense fallback={<Spinner />}>
    <HeavyList query={deferredValue} />
  </Suspense>
);`,
      tips: [
        "Pair with Memoized components for best results",
        "Can trigger Suspense boundaries",
      ],
      commonPitfalls: [
        "Using with fixed delays (it's not setTimeout, it's adaptive to device speed)",
      ],
    },
  },
  {
    id: "useid",
    icon: Hash,
    title: "useId",
    category: "concurrent",
    description: "Generate unique IDs that are stable across SSR",
    component: UseIdDemo,
    theory: {
      overview:
        "useId is a hook for generating unique IDs that can be passed to accessibility attributes.",
      deepDive:
        "Using `Math.random()` for IDs causes mismatches between Server Side Rendering (SSR) and Client Hydration, causing errors. `useId` ensures the ID generated on the server matches the client.",
      whenToUse: [
        "Linking input labels to inputs (htmlFor/id)",
        "ARIA attributes (aria-labelledby)",
      ],
      syntax: `const id = useId();
return (
  <>
    <label htmlFor={id}>Name</label>
    <input id={id} />
  </>
);`,
      tips: ["Do not use for generating keys in a list (use data IDs instead)"],
      commonPitfalls: ["Using it for CSS selectors (IDs might include colons)"],
    },
  },
  {
    id: "usesyncexternalstore",
    icon: Wifi,
    title: "useSyncExternalStore",
    category: "concurrent",
    description: "Subscribe to an external store",
    component: UseSyncExternalStoreDemo,
    theory: {
      overview:
        "A hook recommended for reading and subscribing from external data sources in a way that’s compatible with concurrent rendering features.",
      deepDive:
        "React 18's concurrent rendering (tearing) made it hard for external stores (Redux, MobX, global variables) to stay consistent. This hook enforces consistency by synchronously updating the UI if the store changes, preventing visual glitches.",
      whenToUse: [
        "Subscribing to browser APIs (navigator.onLine, window.innerWidth)",
        "Library authors (Redux, Zustand) implementing subscriptions",
      ],
      syntax: `const state = useSyncExternalStore(subscribe, getSnapshot);`,
      tips: [
        "Prefer built-in state/context if possible",
        "The snapshot function must return a stable value or it triggers infinite loops",
      ],
      commonPitfalls: ["Using it for simple local state"],
    },
  },
  {
    id: "useinsertioneffect",
    icon: Layers,
    title: "useInsertionEffect",
    category: "concurrent",
    description: "CSS-in-JS injection before DOM mutations",
    component: UseInsertionEffectDemo,
    theory: {
      overview:
        "Fires before any DOM mutations. Intended for CSS-in-JS libraries to inject styles.",
      deepDive:
        "It runs even before `useLayoutEffect`. It solves a performance bottleneck where injecting styles *during* layout caused browser style recalculations. By doing it before, React ensures styles are ready before correct layout is calculated.",
      whenToUse: [
        "ONLY for authors of CSS-in-JS libraries (styled-components, emotion)",
      ],
      syntax: `useInsertionEffect(() => {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
}, [css]);`,
      tips: [
        "You probably don't need this hook unless you are building a library",
      ],
      commonPitfalls: ["Trying to access refs (they are not attached yet)"],
    },
  },
];
