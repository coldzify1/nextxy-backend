
This project uses external api for movie data

## Project setup

```bash
$ yarn install
```

## Environment setup

Copy .env.example to .env

## Database migration and seed

```bash
$ yarn prisma:migrate
$ yarn seed
```


## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# test coverage
$ yarn run test:cov
```
## Monitor database
```bash
# monitor database
$ yarn prisma studio
```
