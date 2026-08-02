import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function SEOPage() {
  const data = [
    { id: 1, route: '/', title: 'EcoMargin | Intelligent EV Charging Platform' },
    { id: 2, route: '/products', title: 'Our Products | EcoMargin' },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Page Route', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.route}</div> },
    { header: 'Meta Title', accessor: (r) => r.title }
  ];

  return <ResourceTable title="SEO Configurations" columns={columns} data={data} onAdd={() => {}} />;
}
