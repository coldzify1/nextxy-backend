import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { dtoToMovie, Movie, MovieDto, MoviesResponseDto } from './movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.request.use(config => {
      config.headers['Authorization'] = `Bearer ${process.env.API_TOKEN}`;
      return config;
    });
  }

  async getMovies(): Promise<Movie[]> {
    const data = await this.callApi<MoviesResponseDto>(this.httpService.axiosRef.get(`https://api.themoviedb.org/3/discover/movie`));
    return data.results.map(item => dtoToMovie(item));
  }

  async getMovieDetail(id: string | number): Promise<Movie> {
    const data = await this.callApi<MovieDto>(this.httpService.axiosRef.get(`https://api.themoviedb.org/3/movie/${id}`));
    return dtoToMovie(data);
  }

  private async callApi<T>(func: Promise<any>) {
    try {
      const resp = await func;
      return resp.data as T;
    }
    catch (err) {
      console.log(err);
      throw new HttpException('External API error', HttpStatus.BAD_GATEWAY);
    }
  }
}