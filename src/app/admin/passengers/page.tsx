'use client';

import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { FaTrashAlt } from 'react-icons/fa';

export default function AdminPassengersPage() {
    const { data: passengers = [], refetch, isLoading } = trpc.admin.getAllPassengers.useQuery();
    const deletePassenger = trpc.admin.deletePassenger.useMutation();
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filtered = passengers.filter((p) =>
        `${p.title} ${p.firstName} ${p.lastName} ${p.email} ${p.phoneNumber} ${p.passport} ${p.dateOfBirth}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this passenger?')) return;
        setDeletingId(id);
        await deletePassenger.mutateAsync({ passengerId: id });
        await refetch();
        setDeletingId(null);
    };

    return (
        <section className="px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-3xl font-bold text-blue-900">Passenger Management</h1>
                <input
                    type="text"
                    placeholder="Search passengers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-4 sm:mt-0 px-4 py-2 border border-gray-300 rounded-md w-full sm:w-64"
                />
            </div>

            <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Passport</th>
                        <th className="px-6 py-3 text-left">Date of Birth</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                Loading passengers...
                            </td>
                        </tr>
                    ) : filtered.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                No passengers found.
                            </td>
                        </tr>
                    ) : (
                        filtered.map((p) => (
                            <tr key={p.id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4">{`${p.title} ${p.firstName} ${p.lastName}`}</td>
                                <td className="px-6 py-4">{p.email}</td>
                                <td className="px-6 py-4">{p.phoneNumber}</td>
                                <td className="px-6 py-4">{p.passport}</td>
                                <td className="px-6 py-4">{new Date(p.dateOfBirth).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="text-red-600 hover:text-red-800"
                                        disabled={deletingId === p.id}
                                        title="Delete"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
