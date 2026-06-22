import React from 'react';
import { cn } from './StatCard';

export function SettingsCard({ title, description, children, footer, className }) {
  return (
    <div className={cn("bg-card border border-border rounded-xl shadow-sm overflow-hidden", className)}>
      <div className="px-6 py-5 border-b border-border">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="px-6 py-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-end">
          {footer}
        </div>
      )}
    </div>
  );
}
