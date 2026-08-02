import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function BlogsPage() {
  const data = [
    { id: 1, title: 'The Future of V2G Technology', author: 'Super Admin', status: 'Published', date: 'Oct 12, 2026' },
    { id: 2, title: 'Optimizing Fleet Charging', author: 'Content Editor', status: 'Draft', date: 'Sep 28, 2026' },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Title', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.title}</div> },
    { header: 'Author', accessor: (r) => r.author },
    { header: 'Status', accessor: (r) => (
      <span className={`badge ${r.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>
        {r.status}
      </span>
    ) },
    { header: 'Date', accessor: (r) => r.date }
  ];

  return <ResourceTable title="Manage Blogs" columns={columns} data={data} onAdd={() => {}} />;
}
