# Introduction

This project is a simple service that allows users to get shorter versions of urls.

# Libraries

* Programming language: Typescript
* Environment: Node
* Server framework: Express
* Database: PostgreSQL
* ORM: TypeORM
* Test: Vitest
* Lint: Eslint
* Code formatter: Prettier
* Logger: Winston

# Configuration files

* .eslintrc: Eslint configuration file
* .prettierrc: Prettier Formatt configuration file
* vitest.config.ts: Vitest configuration file

# Project structure
* `src/app/`: ORM config and Express Server entry point
* `src/url/`: Url
    * `delivery/`: Express routes and middlewares
    * `domain/`: Domain of the entity, repository and usecase interfaces
    * `repository/`: ORM Schema and requests
    * `usecase/`: Business rules
* `test/`: Tests 


# Run 
* Create `.env` file from `.env.example`, filling in the missing details
* Install dependencies: `npm install`
* Build server: `npm run build`
* Start server: `npm run start`

# API

1. Shorten an URL
`POST /api/url`

**Request body**
```js
{
    originalUrl: string,
    alias: string?
}
```

**Response**  
```js
{
  "message": string
  "shortUrl": string | null
}
```

2. Redirect shortened URL `GET /api/url/:urlCode`

## Clean Architecture
**Source**: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

<img src="images/CleanArchitecture.jpg" width="700" />