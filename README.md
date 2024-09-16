# FORUM BACKEND

## Stack
- Node.js
- Express.js
- Prisma

## DOC

## SET UP
- Set an environment variable ```DATABASE_URL``` with the connection string to your database
- Set an environmment variable ```JWT_SECRET``` with the secret string for encoding user credentials

## base url: http://localhost:3000


## USER

- Create

```
{{url}}/v1/auth/register

Payload:
{
    "name": string;
    "email": "string";
    "username": "string";
    "password": "string";
}

```


- Login

```
{{url}}/v1/auth/login

Payload:
{
    "username": string;
    "password": string;
}
```
## After logging in, use the jwt token to authenticate for all requests
### Token has a validity of 6 hours


- Get all

```
{{url}}/v1/users
```


- Get

```
{{url}}/v1/users/{{id}}
```
