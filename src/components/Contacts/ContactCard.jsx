import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';

const ContactCard = ({ contact, onDelete, onEdit, onShare }) => {
    // Keep expansion if needed, or just show all. User asked to "put all info under name".
    // I will show all details by default or behind a toggle that is INLINE under the name.
    // Let's assume toggle is nicer for space, but placed correctly.
    const [expanded, setExpanded] = useState(false);

    return (
        <Card className="hover:bg-white/5 transition-colors duration-200">
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[var(--accent-gold)] mb-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                        {contact.firstName} {contact.lastName}
                    </h3>

                    {/* Details List - Directly under name */}
                    <div className="space-y-1">
                        {contact.details && contact.details.map((detail, idx) => {
                            // Logic: Show first few, or hide if not expanded?
                            // User complained about "Phone: ... [Buttons] ... Phone ...".
                            // I will show ALL details here, but maybe limit if flattened?
                            // Let's rely on expansion but keep it HERE.
                            if (!expanded && idx > 0) return null; // Show only first if collapsed

                            return (
                                <div key={idx} className="flex items-center text-sm text-gray-300">
                                    <span className="font-medium mr-2 text-[var(--text-secondary)] w-20 inline-block">{detail.type}:</span>
                                    <span>{detail.value}</span>
                                </div>
                            );
                        })}

                        {contact.details && contact.details.length > 1 && (
                            <div
                                className="text-xs text-[var(--accent-primary)] cursor-pointer mt-1 hover:underline"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? 'Show Less' : `+ ${contact.details.length - 1} more`}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 ml-4">
                    <Button onClick={() => onShare(contact)} className="px-3 py-1 text-xs bg-blue-900/40 border border-blue-800 hover:bg-blue-800">Share</Button>
                    <Button onClick={() => onEdit(contact)} className="px-3 py-1 text-xs bg-yellow-900/40 border border-yellow-800 hover:bg-yellow-800">Edit</Button>
                    <Button onClick={() => onDelete(contact.id)} className="px-3 py-1 text-xs bg-red-900/40 border border-red-800 hover:bg-red-800">Del</Button>
                </div>
            </div>
            {/* Removed bottom expanded section */}
        </Card>
    );
};

export default ContactCard;
