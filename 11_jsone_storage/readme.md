Before Using

What should the .env file look like
    POSTGRES_HOST=(if on local machine - "localhost")
    PORT=(your port)
    POSTGRES_USER=(your postgres user name)
    POSTGRES_DB=(your postgres current DB name)
    POSTGRES_DIALECT=postgres
    POSTGRES_PORT=(the port on which the postgres database is running )
    POSTGRES_PASSWORD=(your postgres password)
    ACCESS_TOKEN_TTL=("60m" by default)
    ACCESS_TOKEN_SECRET=(your secret for access token)
    REFRESH_TOKEN_SECRET=(your secret for refresh token)

How to run it ?
    npm start — run server in production mode
    npm run start:dev — run server in development mode
