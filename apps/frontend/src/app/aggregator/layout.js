import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AggregatorLayout({ children }) {
  return <DashboardLayout role="aggregator">{children}</DashboardLayout>;
}
