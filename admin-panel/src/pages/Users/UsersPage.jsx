import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function UsersPage() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'driver', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'operator', status: 'Active' },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Name', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.name}</div> },
    { header: 'Email', accessor: (r) => r.email },
    { header: 'Role', accessor: (r) => r.role },
    { header: 'Status', accessor: (r) => (
      <span className={`badge ${r.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
        {r.status}
      </span>
    ) }
  ];

  return <ResourceTable title="Manage Users" columns={columns} data={data} onAdd={() => {}} />;
}
