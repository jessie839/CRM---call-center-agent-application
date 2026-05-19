export const allLeads = [
    { id: 1, name: 'Marcus Thorne', company: 'Global Logistics Inc.', avatarColor: '#e0e7ff', iconColor: '#6366f1', reason: 'Contract expiring in 14 days. Pricing page visit detected 1hr ago.', priority: 'high' },
    { id: 2, name: 'Sarah  Mumkins', company: 'CloudSphere', avatarColor: '#fef3c7', iconColor: '#d97706', reason: 'Multiple failed login attempts on billing portal. High churn risk.', priority: 'critical' },
    { id: 3, name: 'Elena Rodriguez', company: 'Vanguard Tech', avatarColor: '#dcfce7', iconColor: '#16a34a', reason: 'Recent website activity: Downloaded "Enterprise Scaling Guide".', priority: 'medium' },
    { id: 4, name: 'David Kim', company: 'NovaSystems', avatarColor: '#fce7f3', iconColor: '#db2777', reason: 'Renewal meeting scheduled. Sent product comparison doc this morning.', priority: 'high' },
    { id: 5, name: 'Priya Nair', company: 'Stellar Analytics', avatarColor: '#e0f2fe', iconColor: '#0284c7', reason: 'No activity in 30 days. Risk of silent churn increasing.', priority: 'critical' },
    { id: 6, name: 'James Okafor', company: 'BrightPath Solutions', avatarColor: '#fef9c3', iconColor: '#ca8a04', reason: 'Requested demo for expanded team license last week.', priority: 'medium' },
    { id: 7, name: 'Amelia Carter', company: 'Nexus Digital', avatarColor: '#ede9fe', iconColor: '#7c3aed', reason: 'Opened 3 emails in 24hrs. Visited upgrade pricing page twice.', priority: 'high' },
    { id: 8, name: 'Riku Tanaka', company: 'OmniFlow Labs', avatarColor: '#d1fae5', iconColor: '#059669', reason: 'Support ticket open for 5 days — escalation needed.', priority: 'critical' },
    { id: 9, name: 'Fatima Al-Rashid', company: 'Meridian Corp', avatarColor: '#fee2e2', iconColor: '#dc2626', reason: 'Expressed interest in Q3 partnership program via email.', priority: 'medium' },
    { id: 10, name: 'Leon Brooks', company: 'Apex Ventures', avatarColor: '#ecfdf5', iconColor: 'var(--accent)', reason: 'Trial ending in 3 days. Has not spoken to sales rep yet.', priority: 'high' },
    { id: 11, name: 'Nadia Petrova', company: 'BlueSky SaaS', avatarColor: '#eff6ff', iconColor: '#2563eb', reason: 'Downgraded plan last month. Follow-up call overdue.', priority: 'medium' },
    { id: 12, name: 'Omar Khalil', company: 'Horizon Retail', avatarColor: '#fdf4ff', iconColor: '#a21caf', reason: 'Competitor mentioned in support chat. Needs retention offer.', priority: 'critical' },
    { id: 13, name: 'Lily Zhang', company: 'CoreData Inc.', avatarColor: '#fff7ed', iconColor: '#ea580c', reason: 'Attended last webinar. Engaged with pricing chatbot this week.', priority: 'low' },
];

export const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

export const priorityDotColors = {
    critical: 'var(--danger)',
    high: 'var(--accent)',
    medium: 'var(--success)',
    low: 'var(--accent)',
};

export const priorityBadgeStyles = {
    critical: { background: 'var(--danger-light)', color: 'var(--danger)' },
    high: { background: 'var(--accent-light)', color: 'var(--accent)' },
    medium: { background: 'var(--success-light)', color: 'var(--success)' },
    low: { background: '#faf5ff', color: '#7e22ce' },
};