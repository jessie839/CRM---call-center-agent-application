export const allActivities = [
  { id: 1, title: 'Ticket #84920 - Escalated', time: '10:45 AM', type: 'Support', status: 'escalated' },
  { id: 2, title: 'Inbound Query - Resolved', time: '09:15 AM', type: 'Support', status: 'resolved' },
  { id: 3, title: 'Proposal sent to Marcus Thorne', time: '08:30 AM', type: 'Email', status: 'sent' },
  { id: 4, title: 'Contract signed - Global Logistics', time: '08:00 AM', type: 'Document', status: 'done' },
  { id: 5, title: 'Follow-up call - CloudSphere', time: 'Yesterday', type: 'Call', status: 'done' },
  { id: 6, title: 'Demo scheduled - Nexus Digital', time: 'Yesterday', type: 'Meeting', status: 'upcoming' },
  { id: 7, title: 'Invoice #108 sent - BrightPath', time: 'Yesterday', type: 'Email', status: 'sent' },
  { id: 8, title: 'Ticket #85020 - Resolved', time: 'Yesterday', type: 'Support', status: 'resolved' },
  { id: 9, title: 'Renewal discussion - Apex Ventures', time: '2 days ago', type: 'Call', status: 'done' },
  { id: 10, title: 'Churn risk flagged - BlueSky SaaS', time: '2 days ago', type: 'Alert', status: 'escalated' },
  { id: 11, title: 'Partnership email - Meridian Corp', time: '2 days ago', type: 'Email', status: 'sent' },
  { id: 12, title: 'Onboarding completed - OmniFlow Labs', time: '3 days ago', type: 'Meeting', status: 'done' },
  { id: 13, title: 'Pricing query - CoreData Inc.', time: '3 days ago', type: 'Support', status: 'resolved' },
];

export const statusConfig = {
  resolved: { label: 'Resolved', color: 'var(--accent)', bg: '#f0fdf4', border: '#bbf7d0' },
  done: { label: 'Done', color: 'var(--accent)', bg: '#f0fdf4', border: '#bbf7d0' },
  sent: { label: 'Sent', color: 'var(--accent)', bg: '#eff6ff', border: '#bfdbfe' },
  escalated: { label: 'Escalated', color: 'var(--accent)', bg: '#fff1f2', border: '#fecdd3' },
  upcoming: { label: 'Upcoming', color: 'var(--accent)', bg: '#fffbeb', border: '#fde68a' },
};

export const typeConfig = {
  Support: { color: '#6366f1', bg: '#eef2ff' },
  Email: { color: 'var(--accent)', bg: '#eff6ff' },
  Call: { color: 'var(--accent)', bg: '#e0f2fe' },
  Document: { color: 'var(--accent)', bg: '#ecfeff' },
  Meeting: { color: 'var(--accent)', bg: '#f0fdf4' },
  Alert: { color: 'var(--accent)', bg: '#fff1f2' },
};

export const typeIcons = {
  Support: 'M18 20V10M12 20V4M6 20v-6',
  Email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
  Call: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  Document: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
  Meeting: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  Alert: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
};


