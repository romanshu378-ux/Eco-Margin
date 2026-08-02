import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';
import { FiDownload } from 'react-icons/fi';

export default function NewsletterPage() {
  const data = [
    { id: 1, email: 'earlyadopter@example.com', subscribedAt: 'Aug 1, 2026' },
    { id: 2, email: 'evfan@example.com', subscribedAt: 'Aug 2, 2026' },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Email', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.email}</div> },
    { header: 'Subscribed Date', accessor: (r) => r.subscribedAt }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button className="btn btn-outline">
          <FiDownload /> Export CSV
        </button>
      </div>
      <ResourceTable title="Newsletter Subscribers" columns={columns} data={data} />
    </div>
  );
}
