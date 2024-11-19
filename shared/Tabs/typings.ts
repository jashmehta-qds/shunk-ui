export interface TabsProps {
  tabList: TabList[];
  onChange?: (tabId: string) => void;
  selected?: string;
}

export interface TabList {
  id: string;
  value: React.ReactNode | string;
  redirection?: string;
}
