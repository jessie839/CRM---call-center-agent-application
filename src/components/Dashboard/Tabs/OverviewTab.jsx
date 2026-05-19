import React from 'react';
import AgentProfile from '../AgentProfile';
import PendingTasks from '../PendingTasks';
// import CallLog from '../CallLog';
import CallSummary from '../CallSummary';
import TopKPIs from '../TopKPIs';
import PerformanceChart from '../PerformanceChart';
import RecommendedNextAction from '../RecommendedNextAction';
import TimeBreakdown from '../TimeBreakdown';
import AIInsights from '../AIInsights';
import LiveAISuggestions from '../LiveAISuggestions';
import LatestActivity from '../CallLog';

export default function OverviewTab() {
  return (
    <div className="dash-content-area fade-in">
      {/* LEVEL 2: SECONDARY (Core Metrics & Analytics) */}
      <section className="secondary-metrics-layout">
        <TopKPIs />
      </section>

      {/* LEVEL 1: PRIMARY (Hero Section – Highest Priority) */}
      <section className="primary-hero-layout">
        <div className="primary-hero-left">
          <RecommendedNextAction />
        </div>
        <div className="primary-hero-right">
          <AIInsights />
        </div>
      </section>

      {/* LEVEL 3: TERTIARY (Supporting Information - Spacious) */}
      <section className="tertiary-supporting-layout">
        <div className="secondary-grid-left">
          <PerformanceChart />
        </div>
        <div className="secondary-grid-right">
          <TimeBreakdown />
        </div>
      </section>

      {/* LEVEL 3: TERTIARY (Supporting Information - Spacious) */}
      <section className="tertiary-supporting-layout">
        <PendingTasks />
<LatestActivity />
        {/* <CallLog /> */}

      </section>
    </div>
  );
}
