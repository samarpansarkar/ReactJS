import { Link } from 'react-router-dom';
import { BookOpen, Code, FileCode, Layers, Zap, ArrowRight } from 'lucide-react';

const HomePage = () => {
    const topics = [
        {
            path: '/react',
            title: 'React Optimization',
            desc: 'Master hooks, performance, and advanced patterns.',
            icon: Zap,
            color: 'bg-blue-100 text-blue-600',
            count: '10+ Modules'
        },
        {
            path: '/js',
            title: 'JavaScript Core',
            desc: 'Deep dive into closures, async/await, and prototypes.',
            icon: Code,
            color: 'bg-yellow-100 text-yellow-600',
            count: 'Coming Soon'
        },
        {
            path: '/html-css',
            title: 'Modern HTML & CSS',
            desc: 'Flexbox, Grid, semantic HTML, and accessibility.',
            icon: Layers,
            color: 'bg-orange-100 text-orange-600',
            count: 'Coming Soon'
        },
        {
            path: '/ts',
            title: 'TypeScript',
            desc: 'Strict typing, interfaces, and generics.',
            icon: FileCode,
            color: 'bg-blue-50 text-blue-700',
            count: 'Coming Soon'
        },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 py-12">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    Master Modern <span className="text-indigo-600">Web Development</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                    Interactive practical guides, optimization techniques, and deep dives into the modern web stack.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link to="/react" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                        Start Learning
                    </Link>
                    <a href="https://github.com/samarpansarkar/ReactJS" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
                        View on GitHub
                    </a>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {topics.map((topic) => (
                    <Link
                        key={topic.path}
                        to={topic.path}
                        className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${topic.color}`}>
                                <topic.icon className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                {topic.count}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {topic.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                            {topic.desc}
                        </p>
                        <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                            Explore Module <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
