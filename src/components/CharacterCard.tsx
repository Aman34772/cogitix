import { CharacterCardProps } from "@/types/character";
import Image from "next/image";
import React from "react";

const CharacterCard: React.FC<CharacterCardProps> = ({ name, url }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[7.5rem] h-[7.5rem] rounded-full overflow-hidden">
        <Image
          width={150}
          height={150}
          src={url}
          alt={name}
          object-fit="cover"
        />
      </div>
      <div className="mt-2 text-center text-lg font-semibold">
        <p className="line-clamp-2 text-ellipsis break-words">{name}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
