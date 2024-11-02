"use client";
import CharacterCard from "@/components/CharacterCard";
import { useAxios } from "@/hooks/useAxios";
import { Character } from "@/types/character";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EpisodeDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [characterList, setCharacterList] = useState<Character[]>([]);

  const searchParams = useSearchParams();

  const { data, error, loading } = useAxios<Character[]>({
    url: `character/${searchParams.get("characters")}`,
  });

  useEffect(() => {
    if (data) {
      setCharacterList(data);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="font-bold my-4 ">
        {characterList.length} Characters in the episode &quot;
        {decodeURIComponent(params.id)}&quot;
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {characterList.map((character) => (
          <div key={character.id} className="flex flex-col items-center ">
            <CharacterCard name={character.name} url={character.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeDetails;
