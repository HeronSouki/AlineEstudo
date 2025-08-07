'use client';
import React, { useState } from 'react';

export function Tabs({ defaultValue, children }: { defaultValue: string, children: React.ReactNode }) {
  const [value, setValue] = useState(defaultValue);
  // children are expected as: <TabsList/> + multiple <TabsContent value="..."/>
  return <div data-tabs-value={value}>{React.Children.map(children, (child: any) => {
    if (!child) return null;
    if (child.type.displayName === 'TabsList') {
      return React.cloneElement(child, { value, onChange: setValue });
    }
    if (child.type.displayName === 'TabsContent') {
      return value === child.props.value ? child : null;
    }
    return child;
  })}</div>;
}

export function TabsList({ children, value, onChange }: { children: React.ReactNode, value?: string, onChange?: (v: string)=>void }) {
  return <div className="tabs-list">{React.Children.map(children, (child: any) => {
    if (!child) return null;
    return React.cloneElement(child, { activeValue: value, onChange });
  })}</div>;
}
TabsList.displayName = 'TabsList';

export function TabsTrigger({ children, value, activeValue, onChange }:
  { children: React.ReactNode, value: string, activeValue?: string, onChange?: (v: string)=>void }) {
  const active = value === activeValue;
  return <button className="tabs-trigger" data-active={active} onClick={() => onChange && onChange(value)}>{children}</button>;
}
TabsTrigger.displayName = 'TabsTrigger';

export function TabsContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-4">{children}</div>;
}
TabsContent.displayName = 'TabsContent';
