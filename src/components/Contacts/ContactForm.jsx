import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createContact, getContact, updateContact } from '../../api/contacts';
import Card from '../UI/Card';
import Button from '../UI/Button';

const ContactForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        details: [] // { type, value }
    });
    const [loading, setLoading] = useState(false);
    const [detailType, setDetailType] = useState('Phone');
    const [detailValue, setDetailValue] = useState('');

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            getContact(id)
                .then(data => setFormData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    details: data.details || []
                }))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    const handleAddDetail = () => {
        if (detailValue.trim()) {
            setFormData(prev => ({
                ...prev,
                details: [...prev.details, { type: detailType, value: detailValue }]
            }));
            setDetailValue('');
        }
    };

    const removeDetail = (index) => {
        setFormData(prev => ({
            ...prev,
            details: prev.details.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await updateContact(id, formData);
            } else {
                await createContact(formData);
            }
            navigate('/');
        } catch (err) {
            console.error('Error saving contact:', err);
            console.error('Error response:', err.response);
            const errorMsg = err.response?.data?.message || err.response?.data || err.message || 'Failed to save contact';
            alert(`Failed to save contact: ${errorMsg}`);
        }
    };

    if (loading) return <div className="text-center pt-20 text-gray-300">Loading...</div>;

    return (
        <div className="pt-24 px-6 max-w-2xl mx-auto">
            <Card>
                <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Contact' : 'New Contact'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">First Name</label>
                            <input
                                className="input-field"
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                            <input
                                className="input-field"
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                        <label className="block text-sm text-gray-300 mb-2 font-semibold">Contact Details</label>

                        <div className="space-y-2 mb-4">
                            {formData.details.map((detail, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-white/5 p-2 rounded">
                                    <span className="text-sm">
                                        <span className="text-gray-400 mr-2">{detail.type}:</span>
                                        {detail.value}
                                    </span>
                                    <button type="button" onClick={() => removeDetail(idx)} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <select
                                className="input-field w-1/3"
                                value={detailType}
                                onChange={e => setDetailType(e.target.value)}
                            >
                                <option value="Phone">Phone</option>
                                <option value="Email">Email</option>
                                <option value="Telegram">Telegram</option>
                                <option value="Address">Address</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                className="input-field flex-grow"
                                placeholder="Value..."
                                value={detailValue}
                                onChange={e => setDetailValue(e.target.value)}
                            />
                            <Button type="button" onClick={handleAddDetail}>Add</Button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" onClick={() => navigate('/')} className="bg-transparent border border-white/20">Cancel</Button>
                        <Button type="submit">Save Contact</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ContactForm;
