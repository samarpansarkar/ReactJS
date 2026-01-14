
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '@/components/common/Modal';
import api from '@/api/client';

const AdminSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/subjects');
            setSubjects(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch subjects');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const checkDelete = (subject) => {
        setSelectedSubject(subject);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedSubject) return;

        try {
            await api.delete(`/subjects/${selectedSubject._id}`);
            fetchSubjects();
            setShowDeleteModal(false);
            setSelectedSubject(null);
        } catch (error) {
            console.error("Failed to delete subject", error);
            // Could add a toast here later
        }
    };

    if (loading) return <div className="text-white">Loading subjects...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Subjects</h2>
                <Link
                    to="/admin/subjects/new"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} /> Add Subject
                </Link>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900 border-b border-gray-700">
                                <th className="p-4 text-gray-400 font-medium">Title</th>
                                <th className="p-4 text-gray-400 font-medium">Path</th>
                                <th className="p-4 text-gray-400 font-medium">Color</th>
                                <th className="p-4 text-gray-400 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {subjects.map(subject => (
                                <tr key={subject._id} className="hover:bg-gray-750 transition-colors">
                                    <td className="p-4 font-medium text-white">{subject.title}</td>
                                    <td className="p-4 text-gray-300 font-mono text-sm">{subject.path}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full ${subject.color?.split(' ')[1] || 'bg-gray-500'}`}></div>
                                            <span className="text-xs text-gray-400 font-mono">{subject.color}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/admin/subjects/edit/${subject._id}`}
                                                className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => checkDelete(subject)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {subjects.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">
                                        No subjects found. Create one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Confirm Deletion"
                footer={
                    <>
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            Delete Subject
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete the subject <span className="font-bold text-white">{selectedSubject?.title}</span>?
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-200 text-sm">
                        Warning: This action cannot be undone. All related topics and content might become inaccessible.
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminSubjects;
