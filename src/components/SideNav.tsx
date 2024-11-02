"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useAxios } from "@/hooks/useAxios";
import SidebarList from "./SideBarList";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { Episode, EpisodeResponse } from "@/types/episode";

const Sidebar: React.FC = () => {
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, loading } = useAxios<EpisodeResponse>({
    url: `episode?page=${page}`,
  });

  useEffect(() => {
    if (data && !error) {
      setEpisodeList((prevEpisodes) => [...prevEpisodes, ...data.results]);
      setIsFetching(false);
    }
  }, [data, error]);

  const handleScroll = useCallback(() => {
    const scrollableElement = document.querySelector(".side-nav");
    if (scrollableElement) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetching) {
        setIsFetching(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [isFetching]);

  const debouncedHandleScroll = useDebounce(handleScroll, 200);

  useEffect(() => {
    const scrollableElement = document.querySelector(".side-nav");
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", debouncedHandleScroll);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [debouncedHandleScroll, handleScroll]);

  const handleEpisodeClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="p-4 text-white w-full flex justify-between lg:justify-center text-end  bg-gray-900 fixed z-10  ">
        <div
          onClick={() => {
            router.push("/");
            if (isOpen) {
              setIsOpen(false);
            }
          }}
          className="font-bold text-[25px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-gradient font-extrabold drop-shadow-lg"
        >
          Rick and Morty Characters
        </div>

        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Episodes"}
        </button>
      </div>

      <aside
        className={` w-64 h-screen mt-[60px]  fixed bg-gray-800 text-white shadow-lg transition-transform duration-300  transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div
          className="text-2xl sticky top-0 p-4 font-semibold text-indigo-400 cursor-pointer"
          onClick={() => {
            router.push("/");
            setIsOpen(false);
          }}
        >
          Episodes
        </div>
        <SidebarList items={episodeList} onItemClick={handleEpisodeClick} />
        {loading && <p className="p-4 text-center">Loading more episodes...</p>}
        {error && (
          <p className="p-4 text-center text-red-500">Failed to load data</p>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
