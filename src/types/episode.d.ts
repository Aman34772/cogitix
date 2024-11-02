export interface Episode {
  id: number;
  name: string;
  characters: string[];
}

export interface EpisodeResponse {
  results: Episode[];
}
