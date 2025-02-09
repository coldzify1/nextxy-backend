import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { mockMovie } from 'src/mocks/movie';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            getMovies: jest.fn().mockResolvedValue([]),
            getMovieDetail: jest.fn().mockResolvedValue(mockMovie),
          },
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  
  it('should be defined', async () => {
    expect(movieController).toBeDefined();
    expect(movieService).toBeDefined();
  });

  it('should return all movies', async () => {
    await expect(movieController.getAllMovies()).resolves.toEqual([]);
  });

  it('should return a movie', async () => {
    await expect(movieController.getMovieDetail('id')).resolves.toEqual(mockMovie);
  });

});
