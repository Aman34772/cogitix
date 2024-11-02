"use client";

import CharacterCard from "@/components/CharacterCard";
import Pagination from "@/components/Pagination";
import { useAxios } from "@/hooks/useAxios";
import { Character, CharacterResponse } from "@/types/character";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { data, error, loading } = useAxios<CharacterResponse>({
    url: `character?page=${page}`,
  });

  useEffect(() => {
    if (data) {
      setTotalPage(data.info.pages);
      setAllCharacters(data.results);
    }
  }, [data]);

  return (
    <div className="p-4 ">
      <div>
        {loading && <div className="text-center">Loading...</div>}
        {error && (
          <div className="text-center text-red-500">Error: {error}</div>
        )}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {allCharacters.map((character) => (
              <CharacterCard
                name={character.name}
                url={character.image}
                key={character.id}
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex justify-center mt-2 ">
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
}
