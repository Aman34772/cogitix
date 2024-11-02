export type Character = {
  id: number;
  name: string;
  image: string;
};

export interface CharacterResponse {
  info: {
    pages: number;
  };
  results: Character[];
}

export interface CharacterCardProps {
  name: string;
  url: string;
}

export type PaginationType = {
  currentPage: number;
  setPage: (page: number) => void;
  totalPage: number;
};
