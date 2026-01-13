import { Outlet, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTopics } from '@/context/TopicContext';
import { useSubjects } from '@/context/SubjectContext';

const MainLayout = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { getTopicsBySubject } = useTopics();
    const { subjects } = useSubjects();

    // Determine current subject context
    const currentSubject = useMemo(() => {
        const path = location.pathname;
        const matchingSubject = subjects.find(sub => path.startsWith(sub.path));

        if (matchingSubject) {
            // Return unique identifier (e.g., path fragment or name)
            // Using logic similar to getTopicsBySubject expectations
            return matchingSubject;
        }

        return null;
    }, [location.pathname, subjects]);

    // Get sections for the sidebar based on subject
    const sidebarConfig = useMemo(() => {
        if (currentSubject) {
            // Fetch topics dynamically using the subject's path identifier or name
            // Subject paths are like '/react', we need 'react'
            const subjectKey = currentSubject.path.replace('/', '') || currentSubject.name.toLowerCase();

            return {
                title: currentSubject.title || (currentSubject.name + ' Concepts'),
                basePath: currentSubject.path,
                sections: getTopicsBySubject(subjectKey)
            };
        }

        return {
            title: '',
            basePath: '',
            sections: []
        };
    }, [currentSubject, getTopicsBySubject]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            {/* Top Header - Always visible */}
            <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex flex-1 pt-0">
                {/* Fixed Sidebar - Visible on Desktop, Toggle on Mobile */}
                {/* Only show sidebar if there are sections to show or we are in a subject route */}
                {currentSubject && (
                    <Sidebar
                        isOpen={sidebarOpen}
                        closeSidebar={() => setSidebarOpen(false)}
                        title={sidebarConfig.title}
                        basePath={sidebarConfig.basePath}
                        sections={sidebarConfig.sections}
                    />
                )}

                {/* Main Content Area */}
                <main
                    className={`flex-1 p-4 md:p-8 transition-all duration-200 dark:text-gray-100 ${currentSubject ? 'md:ml-64' : ''
                        }`}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
