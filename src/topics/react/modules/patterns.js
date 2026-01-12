import { Activity, Users, Clock, Package, Layers } from "lucide-react";
import CustomHooksDemo from "../components/CustomHooksDemo";
import ContextOptimizationDemo from "../components/ContextOptimizationDemo";
import DebounceDemo from "../components/DebounceDemo";
import LazyLoadDemo from "../components/LazyLoadExample";
import VirtualizationDemo from "../components/VirtualizationDemo";

export const patterns = [
  {
    id: "custom-hooks",
    icon: Activity,
    title: "Custom Hooks",
    category: "patterns",
    description: "Extracting reusable component logic",
    component: CustomHooksDemo,
    theory: {
      overview:
        "A custom hook is a JavaScript function whose name starts with 'use' and that may call other Hooks.",
      deepDive:
        "React hooks are just functions. You can compose them. If you find yourself duplicating logic (e.g. fetching data, managing form state) across components, extract it into a custom hook. This keeps components clean and declarative.",
      whenToUse: [
        "Sharing stateful logic between components",
        "Complex logic abstraction",
        "API layers",
      ],
      syntax: `function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
     // ... listener logic
  }, []);
  return size;
}`,
      tips: [
        "Always start name with 'use'",
        "Treat them as unit-testable blocks of logic",
      ],
      commonPitfalls: [
        "Conditionals inside the custom hook that break Rules of Hooks",
      ],
    },
  },
  {
    id: "context-optimization-pattern", // Changed ID to avoid conflict if core also uses it
    icon: Users,
    title: "Context Optimization",
    category: "patterns",
    description: "Prevent unnecessary re-renders in Context API",
    component: ContextOptimizationDemo,
    theory: {
      overview:
        "Split Contexts to ensure components only re-render when the specific data they typically need changes.",
      deepDive:
        "Context API triggers re-renders for all consumers when the value reference changes. Splitting contexts allows granular subscriptions.",
      whenToUse: [
        "When Context object has multiple unrelated values (e.g. User and Theme)",
        "When frequency of updates differs drastically between values",
      ],
      syntax: `// Good Pattern
<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <App />
  </ThemeContext.Provider>
</UserContext.Provider>`,
      tips: ["Keep contexts small and focused"],
      commonPitfalls: [
        "Passing a new object literal directly to `value` prop: This forces all consumers to re-render every time the Provider re-renders.",
      ],
    },
  },
  {
    id: "debounce",
    icon: Clock,
    title: "Debouncing",
    category: "patterns",
    description: "Limit the rate at which a function fires",
    component: DebounceDemo,
    theory: {
      overview:
        "Debouncing ensures that a function is not called until a certain amount of time has passed since the last call.",
      deepDive:
        "Crucial for network optimization. If a user types 60wpm, you don't want 300 API calls. Debouncing waits for the user to 'stop' (pause) for N ms before firing.",
      whenToUse: [
        "Search inputs triggering API calls",
        "Window resize event handlers",
        "Form validation on typing",
      ],
      syntax: `const debouncedValue = useDebounce(value, 500);
      
useEffect(() => {
    // API Call
}, [debouncedValue]);`,
      tips: ["Use a custom hook for reuse", "Clean up timeouts in useEffect"],
      commonPitfalls: [
        "Implementing directly inside render without useCallback (timer gets recreated/cleared constantly)",
      ],
    },
  },
  {
    id: "lazy",
    icon: Package,
    title: "Code Splitting",
    category: "patterns",
    description: "Load components only when needed",
    component: LazyLoadDemo,
    theory: {
      overview:
        "React.lazy allows you to render a dynamic import as a regular component, reducing initial bundle size.",
      deepDive:
        "Modern bundlers (Vite/Webpack) can split your code into 'chunks'. `React.lazy` fetches the chunk over the network only when the component is actually rendered. `Suspense` handles the 'loading' state while the network request is pending.",
      whenToUse: [
        "Route-based code splitting (Page level)",
        "Heavy Visualization/Chart libraries",
        "Modals that aren't initially open",
      ],
      syntax: `const LazyComp = lazy(() => import('./Comp'));

<Suspense fallback={<Loading />}>
  <LazyComp />
</Suspense>`,
      tips: [
        "Wrap closest high-level parent in Suspense",
        "Reduces Time-to-Interactive (TTI)",
      ],
      commonPitfalls: [
        "Lazy loading small components (network overhead > download savings)",
      ],
    },
  },
  {
    id: "virtualization",
    icon: Layers,
    title: "List Virtualization",
    category: "patterns",
    description: "Render only visible items in large lists",
    component: VirtualizationDemo,
    theory: {
      overview:
        "Virtualization renders only the visible portion of a large list (windowing).",
      deepDive:
        "DOM nodes are heavy memory consumers. A list of 10,000 items creates 10,000 <div>s. Virtualization only creates the ~10 <div>s currently on screen + a buffer. As you scroll, it recycles these nodes or unmounts old ones, simulating a large scroll height with a fake spacer container.",
      whenToUse: [
        "Lists with 100+ items that are complex",
        "Infinite scroll feeds (Facebook/Twitter style)",
        "Data Grid/Tables with thousands of rows",
      ],
      syntax: `// Using react-window
<FixedSizeList itemCount={1000} height={500} ...>
  {RowComponent}
</FixedSizeList>`,
      tips: [
        "Use established libraries (virtuoso, react-window)",
        "Only works if you can calculate or know item heights",
      ],
      commonPitfalls: [
        "Trying to implement from scratch (very hard to handle scroll jank/edge cases)",
      ],
    },
  },
];
