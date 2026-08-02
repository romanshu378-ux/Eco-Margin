import React from 'react';
import { ResourceTable } from '../../components/ResourceTable';

export default function SettingsPage() {
  const data = [
    { id: 1, key: 'site_name', value: 'EcoMargin' },
    { id: 2, key: 'contact_email', value: 'hello@ecomargin.com' },
    { id: 3, key: 'support_phone', value: '+91-99999-99999' },
  ];

  const columns = [
    { header: 'Key', accessor: (r) => <div style={{ fontWeight: 500 }}>{r.key}</div> },
    { header: 'Value', accessor: (r) => r.value }
  ];

  return <ResourceTable title="Global Settings" columns={columns} data={data} onAdd={() => {}} />;
}
