import React, { useEffect, useState } from 'react';
import { getGroups, createGroup, deleteGroup } from '../api/groups';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const GroupList = () => {
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchGroups = async () => {
        try {
            const data = await getGroups();
            setGroups(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (newGroupName.trim()) {
            try {
                await createGroup(newGroupName);
                setNewGroupName('');
                fetchGroups();
            } catch (err) {
                alert('Failed to create group');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this group?')) {
            try {
                await deleteGroup(id);
                setGroups(groups.filter(g => g.id !== id));
            } catch (err) {
                alert('Failed to delete group');
            }
        }
    };

    return (
        <div className="pt-24 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600" style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Manage Groups
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h2 className="text-xl font-bold mb-4">Create New Group</h2>
                    <form onSubmit={handleCreate} className="flex gap-2">
                        <input
                            className="input-field flex-grow"
                            placeholder="Group Name"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            required
                        />
                        <Button type="submit">Create</Button>
                    </form>
                </Card>

                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center text-gray-400">Loading...</div>
                    ) : groups.length > 0 ? (
                        groups.map(group => (
                            <Card key={group.id} className="flex justify-between items-center py-4">
                                <span className="font-medium text-lg">{group.name}</span>
                                <Button onClick={() => handleDelete(group.id)} className="bg-red-600/20 hover:bg-red-600/40 text-red-200 text-sm py-1 px-3">
                                    Delete
                                </Button>
                            </Card>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-4">No groups found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupList;
