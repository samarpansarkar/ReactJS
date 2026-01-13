import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { getIcon, getComponent } from '../utils/componentRegistry';

const TopicContext = createContext();

export const useTopics = () => useContext(TopicContext);

export const TopicProvider = ({ children }) => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper to process topics
    const processTopics = (data) => {
        return data.map(t => ({
            ...t,
            id: t.topicId,
            icon: getIcon(t.icon),
            component: getComponent(t.componentKey),
            theory: {
                ...t.theory,
                pros: t.theory?.pros || [],
                cons: t.theory?.cons || [],
                whenToUse: t.theory?.whenToUse || [],
                tips: t.theory?.tips || [],
                commonPitfalls: t.theory?.commonPitfalls || []
            }
        }));
    };

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/topics');
            const processed = processTopics(data);
            setTopics(processed);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch topics:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    const getTopicsBySubject = (subjectKey) => {
        // Filter topics by subject (assuming topic.subject matches subjectKey like 'react')
        // If topic.subject is missing (legacy), maybe default to 'react'?
        const subjectTopics = topics.filter(t => (t.subject || 'react').toLowerCase() === subjectKey.toLowerCase());

        // Group by section
        const sectionsMap = {};
        subjectTopics.forEach(t => {
            const section = t.section || 'General';
            if (!sectionsMap[section]) {
                sectionsMap[section] = {
                    id: section,
                    title: section.charAt(0).toUpperCase() + section.slice(1), // Capitalize
                    icon: "Layers", // Default or map if needed
                    subtopics: []
                };
            }
            sectionsMap[section].subtopics.push(t);
        });

        // Convert map to array and assign icons
        return Object.values(sectionsMap).map(sec => ({
            ...sec,
            icon: getIcon(sec.icon) // You might want section-specific icons later
        }));
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    return (
        <TopicContext.Provider value={{ topics, getTopicsBySubject, loading, error, refreshTopics: fetchTopics }}>
            {children}
        </TopicContext.Provider>
    );
};
