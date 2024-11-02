"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAllCharactersId } from "@/utils/common";
import { SidebarListProps } from "@/types/sideBar";

const SidebarList: React.FC<SidebarListProps> = ({ items, onItemClick }) => {
  const pathname = usePathname();

  return (
    <nav className="h-full">
      <ul className="space-y-4 h-full overflow-scroll side-nav">
        {items.map((item, index) => {
          const isActive = pathname === `/episode/${item.name}`;
          const characterList = getAllCharactersId(item.characters);

          return (
            <li key={index}>
              <Link
                href={`/episode/${encodeURIComponent(
                  item.name
                )}?characters=${characterList}`}
                className={`flex items-center text-start px-4 py-2 transition-colors ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                onClick={onItemClick}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarList;
