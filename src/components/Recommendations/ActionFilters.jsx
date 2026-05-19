import { Search } from 'lucide-react';

export default function ActionFilters({ search, setSearch, filterPriority, setFilterPriority, sortOption, setSortOption }) {
  return (
    <div className="ra-filters-bar">
      <div className="ra-search-wrap">
        <Search className="ra-search-icon" size={18} />
        <input 
          type="text" 
          className="ra-search-input" 
          placeholder="Search actions by name, company..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select 
        className="ra-filter-select"
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      <select 
        className="ra-filter-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
        <option value="PriorityDesc">Priority (High → Low)</option>
        <option value="PriorityAsc">Priority (Low → High)</option>
      </select>
    </div>
  );
}
