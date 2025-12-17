import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact } from '../api/contacts';
import { shareResource } from '../api/sharing';
import ContactCard from '../components/Contacts/ContactCard';
import Button from '../components/UI/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const data = await getContacts(searchQuery);
            setContacts(data);
        } catch (error) {
            console.error('Failed to fetch contacts', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchContacts();
        }, 500); // Debounce search
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteContact(id);
                setContacts(contacts.filter(c => c.id !== id));
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    const handleShare = async (contact) => {
        const username = prompt("Enter username to share with:");
        if (username) {
            try {
                await shareResource(username, contact.id, 'Contact');
                alert(`Contact "${contact.firstName} ${contact.lastName}" shared successfully with ${username}!`);
            } catch (err) {
                console.error('Share failed:', err);
                const errorMsg = err.response?.data?.message || err.response?.data || err.message || 'Failed to share contact';
                alert(`Share failed: ${errorMsg}`);
            }
        }
    };

    return (
        <div className="pt-24 px-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600" style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    My Contacts
                </h1>
                <Button onClick={() => navigate('/contacts/new')}>+ Add Contact</Button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search contacts..."
                    className="input-field max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-gray-400 text-center mt-10">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contacts.length > 0 ? (
                        contacts.map(contact => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onDelete={handleDelete}
                                onEdit={(c) => navigate(`/contacts/edit/${c.id}`)}
                                onShare={handleShare}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No contacts found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
