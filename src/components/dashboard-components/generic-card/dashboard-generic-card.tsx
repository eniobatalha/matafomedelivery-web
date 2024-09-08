import React from 'react';

interface DashboardGenericCardProps {
  title: string;
  value: string;
  subtitle: string;
  svgIcon: React.ReactNode;
}

const DashboardGenericCard: React.FC<DashboardGenericCardProps> = ({ title, value, subtitle, svgIcon }) => {
  return (
    <div className="card bg-white p-4 rounded-lg shadow-md border-solid border-slate-100">
      <div className="card-header flex items-center justify-between pb-2">
        <div className="text-sm font-medium">{title}</div>
        <div className="icon">{svgIcon}</div>
      </div>
      <div className="card-body">
        <div className="text-2xl font-bold text-orange-500">{value}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
};

export default DashboardGenericCard;
