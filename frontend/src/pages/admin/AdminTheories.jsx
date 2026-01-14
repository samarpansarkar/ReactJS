import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api/client';
import { Edit, Trash2, Plus, BookOpen, FileText } from 'lucide-react';
import Modal from '@/components/common/Modal';

const AdminTheories = () => {
    const [theories, setTheories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTheories = async () => {
        try {
            const { data } = await api.get('/theory');
            setTheories(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch content');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTheories();
    }, []);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTheory, setSelectedTheory] = useState(null);

    const checkDelete = (theory) => {
        setSelectedTheory(theory);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedTheory) return;

        try {
            await api.delete(`/theory/${selectedTheory.topicId}`);
            fetchTheories();
            setShowDeleteModal(false);
            setSelectedTheory(null);
        } catch (err) {
            console.error("Failed to delete content", err);
            // Could add a toast here later
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="text-indigo-500" />
                    Manage Content (Theory)
                </h2>
                <Link
                    to="/admin/topic/new"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={18} /> Add Content
                </Link>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-750 text-gray-400 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b border-gray-700">Title</th>
                            <th className="p-4 border-b border-gray-700">ID</th>
                            <th className="p-4 border-b border-gray-700">Section</th>
                            <th className="p-4 border-b border-gray-700">Level</th>
                            <th className="p-4 border-b border-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-gray-300">
                        {theories.map((theory) => (
                            <tr key={theory._id} className="hover:bg-gray-750 transition-colors">
                                <td className="p-4 font-medium text-white flex items-center gap-2">
                                    <FileText size={16} className="text-gray-500" />
                                    {theory.title}
                                </td>
                                <td className="p-4 font-mono text-sm text-gray-500">{theory.topicId}</td>
                                <td className="p-4 text-indigo-400">{theory.section}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold
                                        ${theory.level === 'beginner' ? 'bg-green-900/30 text-green-400' :
                                            theory.level === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                                                theory.level === 'hard' || theory.level === 'expert' ? 'bg-red-900/30 text-red-400' :
                                                    'bg-gray-700 text-gray-300'}`}>
                                        {theory.level}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        to={`/admin/topic/edit/${theory.topicId}`} // Using topicId (slug) or _id depending on route support
                                        className="inline-flex p-2 text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
                                        title="Edit"
                                        onClick={(e) => {
                                            // Double check route param expectation
                                            // TheoryPracticalForm loads by ID or Slug?
                                            // Route is /topic/edit/:id
                                            // Backend: router.get("/:id", ...) checks ObjId then topicId
                                            // So passing topicId is safe and readable
                                        }}
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => checkDelete(theory)} // API supports topicId delete
                                        className="inline-flex p-2 text-red-400 hover:bg-red-900/30 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {theories.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    No content found. Click "Add Content" to start.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
                            Delete Content
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete <span className="font-bold text-white">{selectedTheory?.title}</span>?
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-200 text-sm">
                        Warning: This action cannot be undone.
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminTheories;

