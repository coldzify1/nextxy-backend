import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Movie } from './movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }


  @Get()
  @ApiOkResponse({type: Movie})
  async getAllMovies() {
    return this.movieService.getMovies();
  }

  @Get(':id')
  @ApiOkResponse({type: Movie})
  async getMovieDetail(@Param('id') id: string) {
    return this.movieService.getMovieDetail(id);
  }

}