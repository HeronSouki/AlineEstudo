import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="card-title">{children}</div>;
}
export function CardContent({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <div className={`card-content ${className}`}>{children}</div>;
}

export function Button({ children, variant = "primary", disabled, onClick, className="" }:
  { children: React.ReactNode, variant?: "primary" | "secondary" | "outline" | "destructive", disabled?: boolean, onClick?: () => void, className?: string }) {
  const map: Record<string, string> = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    outline: "btn btn-outline",
    destructive: "btn btn-destructive",
  };
  return (
    <button className={`${map[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function Badge({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <span className={`badge ${className}`}>{children}</span>;
}

export function Progress({ value = 0 }: { value: number }) {
  return <div className="progress"><span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>;
}
