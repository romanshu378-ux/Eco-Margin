import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function ProjectsPage() {
  const data = [
    { id: 1, title: 'Metro City Fast Charging Hub', client: 'Metro Transit Authority' },
    { id: 2, title: 'EcoRetail Network', client: 'EcoRetail Group' },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Title', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.title}</div> },
    { header: 'Client', accessor: (r) => r.client }
  ];

  return <ResourceTable title="Manage Projects" columns={columns} data={data} onAdd={() => {}} />;
}
