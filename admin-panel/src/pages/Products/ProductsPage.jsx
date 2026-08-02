import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function ProductsPage() {
  const data = [
    { id: 1, name: 'EcoMargin CSMS Cloud', price: '$499/mo', category: 'Software', status: 'Active' },
    { id: 2, name: 'EcoCharge 150kW DC', price: '$25,000', category: 'Hardware', status: 'Active' },
    { id: 3, name: 'EcoWall 22kW AC', price: '$1,200', category: 'Hardware', status: 'Draft' },
  ];

  const columns = [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Name', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.name}</div> },
    { header: 'Category', accessor: (r) => r.category },
    { header: 'Price', accessor: (r) => r.price },
    { header: 'Status', accessor: (r) => (
      <span className={`badge ${r.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
        {r.status}
      </span>
    ) }
  ];

  return <ResourceTable title="Manage Products" columns={columns} data={data} onAdd={() => {}} />;
}
