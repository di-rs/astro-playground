export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonResults = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};
