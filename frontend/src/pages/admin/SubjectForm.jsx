import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '@/api/client';
import * as Icons from 'lucide-react';

const SubjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        path: '',
        icon: 'BookOpen',
        color: 'text-gray-500',
        order: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const fetchSubject = async () => {
                try {
                    const { data } = await api.get(`/subjects`); // The backend doesn't have GET /:id yet? It does.
                    // Wait, my subjectRoutes.js implementation:
                    // router.get('/', ...)
                    // router.post('/', ...)
                    // router.put('/:id', ...)
                    // router.delete('/:id', ...)
                    // I missed GET /:id in subjectRoutes.js! 
                    // I will need to add it or filter from list.
                    // Let's filter from list for now or assume I'll add GET /:id next turn.
                    // For now, let's just fetch all and find.
                    const subject = data.find(s => s._id === id);
                    if (subject) {
                        setFormData({
                            name: subject.name,
                            title: subject.title,
                            path: subject.path,
                            icon: subject.icon,
                            color: subject.color,
                            order: subject.order
                        });
                    }
                } catch (err) {
                    setError('Failed to fetch subject details');
                }
            };
            fetchSubject();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await api.put(`/subjects/${id}`, formData);
            } else {
                await api.post('/subjects', formData);
            }
            navigate('/admin/subjects');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save subject');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <button
                onClick={() => navigate('/admin/subjects')}
                className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Subjects
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {isEditMode ? 'Edit Subject' : 'New Subject'}
                </h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name (Internal ID)
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                                placeholder="e.g. React"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Path
                            </label>
                            <input
                                type="text"
                                value={formData.path}
                                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                                placeholder="e.g. /react"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Page Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                            placeholder="e.g. React Concepts"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Icon Key (Lucide)
                            </label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                                placeholder="e.g. Zap"
                                required
                            />
                            <div className="mt-2 text-xs text-gray-500">
                                Available: Box, Zap, Code, Layers, FileCode on registry.
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Color Class
                            </label>
                            <input
                                type="text"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                                placeholder="e.g. text-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Order
                        </label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-all ${loading
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'
                                }`}
                        >
                            <Save className="w-4 h-4" />
                            {loading ? 'Saving...' : 'Save Subject'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubjectForm;
