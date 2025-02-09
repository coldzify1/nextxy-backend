import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { mockMovie } from '../../mocks/movie';
describe('MovieService', () => {
  let service: MovieService;
  const mockHttpService = {
    axiosRef: {
      get: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(), // Mocking the use method
        },
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        MovieService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        }
      ],
    }).compile();


    service = module.get<MovieService>(MovieService);
    jest.spyOn(mockHttpService.axiosRef.interceptors.request, 'use').mockImplementation((_fnc: any) => {
      const mockConfig = {
        headers: {}
      };
      _fnc(mockConfig);
    })
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return movies', async () => {
    const mockAxiosResponse = {
      data: {
        page: 1,
        results: []
      }
    };
    jest.spyOn(mockHttpService.axiosRef, 'get').mockResolvedValue(mockAxiosResponse);
    const result = await service.getMovies();
    expect(result).toEqual(mockAxiosResponse.data.results);
  });



  it('should throw error if api fail', async () => {
    jest.spyOn(mockHttpService.axiosRef, 'get').mockRejectedValue(new Error('FakeError'));
    await expect(service.getMovies()).rejects.toThrow(HttpException)
  });

  it('should return a movie', async () => {
    const mockAxiosResponse = {
      data: mockMovie
    };
    jest.spyOn(mockHttpService.axiosRef, 'get').mockResolvedValue(mockAxiosResponse);
    const result = await service.getMovieDetail(1);
    expect(result).toEqual({
      id: mockMovie.id,
      title: mockMovie.title,
      poster_path: mockMovie.poster_path,
    });
  });

});
