export type SidebarItem = {
  id: number;
  name: string;
  characters: string[];
};

export type SidebarListProps = {
  items: SidebarItem[];
  onItemClick: () => void;
};
