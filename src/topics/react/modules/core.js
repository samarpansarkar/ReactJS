import { lazy } from "react";
import {
  Box,
  Database,
  MousePointer,
  Users,
  Zap,
  Code,
  RefreshCw,
} from "lucide-react";

// Lazy Load Components
const UseReducerDemo = lazy(() => import("../components/UseReducerDemo"));
const UseRefDemo = lazy(() => import("../components/UseRefDemo"));
const UseContextDemo = lazy(() => import("../components/UseContextDemo"));
const UseMemoDemo = lazy(() => import("../components/UseMemoDemo"));
const UseCallbackDemo = lazy(() => import("../components/UseCallbackDemo"));
const UseStateDemo = lazy(() => import("../components/UseStateDemo"));
const UseEffectDemo = lazy(() => import("../components/UseEffectDemo"));

export const coreHooks = [
  {
    id: "usestate",
    icon: Box,
    title: "useState",
    category: "core",
    description: "Add local state to functional components",
    component: UseStateDemo,
    theory: {
      overview:
        "useState is a Hook that lets you add React state to function components.",
      deepDive:
        "When you call the set function, React schedules a re-render. State is preserved between these re-renders. If the new state is identical to the old state (Object.is comparison), React skips the re-render.",
      whenToUse: [
        "Managing local component state",
        "Toggling UI elements (modals, dropdowns)",
        "Storing form input values",
      ],
      syntax: `const [count, setCount] = useState(0);
// specific update
setCount(1);
// functional update (best for counters)
setCount(prev => prev + 1);`,
      tips: [
        "Use functional updates when new state depends on old state",
        "Initialize lazy state with a function if expensive",
      ],
      commonPitfalls: [
        "Mutating state directly (e.g. state.value = 5)",
        "Assuming state updates are synchronous (they are batched)",
      ],
    },
  },
  {
    id: "useeffect",
    icon: RefreshCw,
    title: "useEffect",
    category: "core",
    description: "Synchronize a component with an external system",
    component: UseEffectDemo,
    theory: {
      overview:
        "useEffect lets you perform side effects in function components.",
      deepDive:
        "Passes a function that will run after the render is committed to the screen. React compares values in the dependency array to decide if it should re-run. If the array is empty [], it runs only on mount. If omitted, it runs on every render.",
      whenToUse: [
        "Data fetching",
        "Subscribing to events (window resize, sockets)",
        "Manually changing the DOM (document.title)",
      ],
      syntax: `useEffect(() => {
  const connection = createConnection();
  connection.connect();
  
  // Cleanup function (runs before re-running effect or unmount)
  return () => connection.disconnect();
}, [dependency]);`,
      tips: [
        "Always include all used variables in the dependency array",
        "Return a cleanup function to avoid memory leaks",
      ],
      commonPitfalls: [
        "Missing dependencies (stale closures)",
        "Fetching data without a cleanup/ignore flag (race conditions)",
      ],
    },
  },
  {
    id: "usereducer",
    icon: Database,
    title: "useReducer",
    category: "core",
    description: "Manage complex state logic in a single place",
    component: UseReducerDemo,
    theory: {
      overview:
        "An alternative to useState that accepts a reducer of type (state, action) => newState.",
      deepDive:
        "Ideal for state that involves multiple sub-values or when the next state depends on the previous one. It also lets you optimize performance for components that trigger deep updates because you can pass `dispatch` down instead of callbacks.",
      whenToUse: [
        "Complex state logic (e.g. wizard forms, game state)",
        "When state depends on previous state in complex ways",
        "To avoid passing multiple callback props down a tree",
      ],
      syntax: `const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    default:
      throw new Error();
  }
}`,
      tips: ["Dispatch remains stable across renders", "Keep reducers pure"],
      commonPitfalls: [
        "Mutating state directly in reducer (always return new object)",
      ],
    },
  },
  {
    id: "useref",
    icon: MousePointer,
    title: "useRef",
    category: "core",
    description: "Persist values between renders without causing re-renders",
    component: UseRefDemo,
    theory: {
      overview:
        "Returns a mutable ref object whose .current property is initialized to the passed argument.",
      deepDive:
        "Refs are an escape hatch. Changing `ref.current` does NOT trigger a re-render. This makes them perfect for storing mutable data (timers, previous values) or accessing DOM nodes directly.",
      whenToUse: [
        "Accessing DOM elements (focus, scroll)",
        "Storing mutable variables (render counts, timer IDs)",
        "Storing previous state values for comparison",
      ],
      syntax: `const inputRef = useRef(null);
// Access: inputRef.current
// JSX: <input ref={inputRef} />`,
      tips: [
        "Do not read/write refs during rendering",
        "Ideal for 'instance variables'",
      ],
      commonPitfalls: [
        "Using refs for data that should trigger UI updates (use state instead)",
      ],
    },
  },
  {
    id: "usecontext",
    icon: Users,
    title: "useContext",
    category: "core",
    description: "Consume context values without nesting",
    component: UseContextDemo,
    theory: {
      overview:
        "Accepts a context object (the value returned from React.createContext) and returns the current context value.",
      deepDive:
        "It lets you essentially 'teleport' data to any component in the tree without prop drilling. When the nearest <Provider> updates, this hook triggers a re-render with the latest value.",
      whenToUse: [
        "Global state (User, Theme, Language)",
        "Avoiding prop drilling through many layers",
      ],
      syntax: `const value = useContext(MyContext);`,
      tips: [
        "Split contexts to avoid unnecessary re-renders (see Patterns)",
        "Don't overuse; it makes components harder to reuse",
      ],
      commonPitfalls: [
        "Updating the Provider value with a new object every render (forces all consumers to update)",
      ],
    },
  },
  {
    id: "usememo",
    icon: Zap,
    title: "useMemo",
    category: "core",
    description: "Cache expensive calculations between renders",
    component: UseMemoDemo,
    theory: {
      overview:
        "useMemo memoizes the result of a computation and only recalculates when dependencies change.",
      deepDive:
        "Similar to useCallback, but for values. It executes the function passed to it during rendering and caches the return value. This is useful for referential equality of objects/arrays or for skipping expensive calculations (O(n) operations on large datasets).",
      whenToUse: [
        "Expensive calculations (filtering/sorting large arrays)",
        "Creating objects/arrays passed to child components as props (to preserve referential equality)",
        "preventing useEffect loops when an object is a dependency",
      ],
      syntax: `const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);`,
      tips: [
        "Profile before optimizing; don't memoize primitive values or cheap calcs",
        "Ensure the function is pure (no side effects)",
      ],
      commonPitfalls: [
        "Memoizing everything: Increases memory usage and garbage collection overhead.",
        "Missing dependencies: Cached value will be stale.",
      ],
    },
  },
  {
    id: "usecallback",
    icon: Code,
    title: "useCallback",
    category: "core",
    description: "Memoize callback functions to prevent unnecessary re-renders",
    component: UseCallbackDemo,
    theory: {
      overview:
        "useCallback returns a memoized version of a callback function that only changes if dependencies change.",
      deepDive:
        "In JavaScript, functions are objects. Every time a component re-renders, all functions defined inside it are recreated with new references. Closures formed by these functions also capture new scope. exact equality (===) checks fail between the old and new function. `useCallback` caches the function instance between renders, preserving referential equality unless dependencies change. This is crucial when passing callbacks to `React.memo`ized components.",
      whenToUse: [
        "Passing callbacks to optimized child components (React.memo)",
        " preventing child re-renders caused by new function references",
        "When the callback is used as a dependency in other hooks (useEffect)",
      ],
      syntax: `const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);`,
      tips: [
        "Include all dependencies in the dependency array",
        "Don't optimize pre-maturely; it has memory overhead",
        "Always pair with React.memo on the child component",
      ],
      commonPitfalls: [
        "Omitting dependencies: The function will see stale state/props from the closure where it was created.",
        "Using over inline functions for cheap components: The overhead of checking dependencies can be higher than just re-creating the function.",
      ],
    },
  },
];
