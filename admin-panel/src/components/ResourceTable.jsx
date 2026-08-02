import React from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export const ResourceTable = ({ title, columns, data, onAdd }) => {
  return (
    <div className="card" style={{ padding: '0' }}>
      <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h2>
        {onAdd && (
          <button className="btn btn-primary" onClick={onAdd}>
            <FiPlus /> Add New
          </button>
        )}
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col.header}</th>
              ))}
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i}>
                  {columns.map((col, j) => (
                    <td key={j}>{col.accessor(row)}</td>
                  ))}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '0.4rem', border: 'none' }} title="Edit"><FiEdit2 /></button>
                      <button className="btn btn-outline" style={{ padding: '0.4rem', border: 'none', color: 'var(--danger)' }} title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
