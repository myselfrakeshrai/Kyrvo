import React from 'react';
import { Tabs, Tab } from '@mui/material';
interface TabType {
  id: string | undefined;
  name: string;
}
interface TabsProps {
  tabs: TabType[];
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const CustomTabs: React.FC<TabsProps> = ({
  tabs,
  selectedTab,
  onSelectTab,
}) => {
  return (
    <Tabs
      value={selectedTab}
      onChange={(_, newValue) => onSelectTab(newValue)}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
    >
      {tabs.map((tab) => (
        <Tab key={tab.id} label={tab.name} value={tab.id} />
      ))}
    </Tabs>
  );
};

export default CustomTabs;
