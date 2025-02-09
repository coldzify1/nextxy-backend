import { ApiProperty } from "@nestjs/swagger";

export class MoviesResponseDto {
  page: number;
  results: MovieDto[]
}
export class MovieDto {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export class Movie {
  @ApiProperty({description: "Movie Id"})
  id: number;
  @ApiProperty({description: "Movie Titile"})
  title: string;
  @ApiProperty({description: "Movie poster path"})
  poster_path?: string;
}

export function dtoToMovie(dto: MovieDto): Movie {
  return {
    id: dto.id,
    title: dto.title,
    poster_path: `https://image.tmdb.org/t/p/w500/${dto.poster_path}`,
  }
}