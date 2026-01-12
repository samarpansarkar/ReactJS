import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ReactPage from './topics/react/ReactPage';

// Placeholder components for future topics
const PlaceholderPage = ({ title }) => (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-300 mb-4">{title}</h2>
    <p className="text-gray-500">Content coming soon...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          {/* React Route - Matches /react and /react/:topicId */}
          <Route path="react" element={<ReactPage />} />
          <Route path="react/:topicId" element={<ReactPage />} />

          {/* Other Topics */}
          <Route path="js" element={<PlaceholderPage title="JavaScript Core" />} />
          <Route path="html-css" element={<PlaceholderPage title="HTML & CSS" />} />
          <Route path="ts" element={<PlaceholderPage title="TypeScript" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}