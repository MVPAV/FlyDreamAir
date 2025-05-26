'use client';

import { useEffect, useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { FaTrashAlt, FaUserShield, FaUserAlt } from 'react-icons/fa';

export default function AdminUsersPage() {
    const { data: users = [], refetch, isLoading } = trpc.admin.getAllUsers.useQuery();
    const deleteUser = trpc.admin.deleteUser.useMutation();
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState(users);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        setFiltered(
            users.filter((u) =>
                `${u.name ?? ''} ${u.email}`.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, users]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        setDeletingId(id);
        await deleteUser.mutateAsync({
            userId: id,
        });
        await refetch();
        setDeletingId(null);
    };

    return (
        <section className="pt-28 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-3xl font-bold text-blue-900">User Management</h1>
                <input
                    type="text"
                    placeholder="Search users..."
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
                        <th className="px-6 py-3 text-left">Role</th>
                        <th className="px-6 py-3 text-left">Created</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {isLoading ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                Loading users...
                            </td>
                        </tr>
                    ) : filtered.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        filtered.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4">{user.name || '—'}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                </td>
                                <td className="px-6 py-4">{user.createdAt.toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-800"
                                        disabled={deletingId === user.id}
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

            {/* Optional: Pagination here */}
        </section>
    );
}
