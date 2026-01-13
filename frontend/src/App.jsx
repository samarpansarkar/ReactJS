import { BrowserRouter } from 'react-router-dom';
import { TopicProvider } from '@/context/TopicContext';
import { SubjectProvider } from '@/context/SubjectContext';
import { ThemeProvider } from '@/context/ThemeContext';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SubjectProvider>
          <TopicProvider>
            <AppRoutes />
          </TopicProvider>
        </SubjectProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}