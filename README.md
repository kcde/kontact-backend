# Sign up form backend

This is the server for a free trial sign up form

## Tech Stack

- Typescript
- NodeJS
- Express
- MongoDB

## Features

- Sign up a new user
- Delete a user with the email address as an iD
- Fetch all users
- Fetch a user

## TODO

- [x] Verify Users with there password before deleting
- [x] Retutn 404 when trying to delete an unavailable email
- [x] User should be added with unique email
- [ ] Set up test database

## Run Locally

Clone the project

```bash
  git clone {project link}
```

Go to the project directory

```bash
  cd {project directory}
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
   npm run test
```

## API Reference

#### Get all users

```http
  GET /api/users
```

#### Create/signup user

```http
  POST /api/users/
```

| body       | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `fname`    | `string` | **Required**. first name user   |
| `lname`    | `string` | **Required**. last name of user |
| `email`    | `string` | **Required**. email of user     |
| `password` | `string` | **Required**. password of user  |

#### Delete user

```http
  Delete /api/users/
```

| body    | Type     | Description              |
| :------ | :------- | :----------------------- |
| `email` | `string` | **Required**. user email |

## ENV Variables

For MONGO_URL; You need to create a new mongodb cluster and copy the full url. Make sure to input your password if you are using username and password for authentication

```
MONGO_URL =
SALT_ROUNDS =
```
