import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function CategoriesPage() {
  const data = [
    { id: 1, name: 'Hardware', slug: 'hardware', count: 12 },
    { id: 2, name: 'Software', slug: 'software', count: 4 },
    { id: 3, name: 'Services', slug: 'services', count: 8 },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Name', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.name}</div> },
    { header: 'Slug', accessor: (r) => r.slug },
    { header: 'Products Count', accessor: (r) => r.count }
  ];

  return <ResourceTable title="Manage Categories" columns={columns} data={data} onAdd={() => {}} />;
}
