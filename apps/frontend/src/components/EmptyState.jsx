import React from 'react';
import { cn } from './StatCard';

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl bg-muted/10", className)}>
      {Icon && <Icon className="w-10 h-10 text-muted-foreground mb-4" strokeWidth={1.5} />}
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
