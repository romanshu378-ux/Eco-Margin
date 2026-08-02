import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function GalleryPage() {
  const data = [
    { id: 1, title: 'CSMS Dashboard', category: 'software', order: 1 },
    { id: 2, title: 'Highway Installation', category: 'hardware', order: 2 },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Title', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.title}</div> },
    { header: 'Category', accessor: (r) => r.category },
    { header: 'Display Order', accessor: (r) => r.order }
  ];

  return <ResourceTable title="Manage Gallery" columns={columns} data={data} onAdd={() => {}} />;
}
