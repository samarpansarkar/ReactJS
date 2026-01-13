import { useMemo } from 'react';
import TopicLayout from '@/components/layout/TopicLayout';
import { useTopics } from '@/context/TopicContext';

const SubjectPage = ({ subject }) => {
    const { getTopicsBySubject, loading, error } = useTopics();

    // Get topics for this subject
    const sections = getTopicsBySubject(subject.path.replace('/', '') || subject.name.toLowerCase()); // e.g. 'react'

    if (loading) return <div>Loading content...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <TopicLayout
            title={subject.title}
            sections={sections}
            basePath={subject.path}
        />
    );
};

export default SubjectPage;
