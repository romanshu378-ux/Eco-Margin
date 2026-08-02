import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function ContactPage() {
  const data = [
    { id: 1, name: 'Alice Johnson', email: 'alice@corp.com', subject: 'Enterprise Sales', status: 'New' },
    { id: 2, name: 'Bob Williams', email: 'bob@tech.io', subject: 'Partnerships', status: 'Replied' },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Name', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.name}</div> },
    { header: 'Email', accessor: (r) => r.email },
    { header: 'Subject', accessor: (r) => r.subject },
    { header: 'Status', accessor: (r) => (
      <span className={`badge ${r.status === 'New' ? 'badge-error' : 'badge-success'}`}>
        {r.status}
      </span>
    ) }
  ];

  return <ResourceTable title="Contact Submissions" columns={columns} data={data} />;
}
