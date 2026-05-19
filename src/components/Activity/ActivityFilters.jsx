import { Search } from 'lucide-react';

export default function ActivityFilters({ search, setSearch, filterType, setFilterType, filterStatus, setFilterStatus, sortOption, setSortOption }) {
  return (
    <div className="la-filters-bar">
      <div className="la-search-wrap">
        <Search className="la-search-icon" size={18} />
        <input 
          type="text" 
          className="la-search-input" 
          placeholder="Search activities..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select 
        className="la-filter-select"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="All">All Types</option>
        <option value="Call">Call</option>
        <option value="Ticket">Ticket</option>
        <option value="Message">Message</option>
        <option value="System">System</option>
      </select>

      <select 
        className="la-filter-select"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Success">Success</option>
        <option value="Failed">Failed</option>
        <option value="Pending">Pending</option>
      </select>

      <select 
        className="la-filter-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>
    </div>
  );
}
