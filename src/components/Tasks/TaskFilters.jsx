import { Search } from 'lucide-react';

export default function TaskFilters({ search, setSearch, filterTag, setFilterTag, filterStatus, setFilterStatus, sortOption, setSortOption }) {
  return (
    <div className="pt-filters-bar">
      <div className="pt-search-wrap">
        <Search className="pt-search-icon" size={18} />
        <input 
          type="text" 
          className="pt-search-input" 
          placeholder="Search tasks..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select 
        className="pt-filter-select"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="All">All Statuses</option>
      </select>

      <select 
        className="pt-filter-select"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
      >
        <option value="All">All Tags</option>
        <option value="Today">Today</option>
        <option value="Tomorrow">Tomorrow</option>
        <option value="Upcoming">Upcoming</option>
      </select>

      <select 
        className="pt-filter-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>
    </div>
  );
}
