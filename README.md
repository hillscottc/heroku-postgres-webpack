# react-for-heroku

Heroku app name is calm-waters-80883

## Instructions

- Local dev mode

1. Clone this repo
2. Run `npm install`
3. Run `npm run dev`, **localhost:8080** will open up in your default browser

- Production, served from heroku
  <https://calm-waters-80883.herokuapp.com>

## Databse stuff

Heroku DATABASE_URL=postgresql-dimensional-59756

`heroku pg:psql`

```sql
CREATE TABLE movies(
id SERIAL PRIMARY KEY,
title VARCHAR(30),
year SMALLINT,
thumb VARCHAR(30),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 );

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON movies
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

```

TRY CHANGING FROM POOL TO CLIENT CONNECT!!!!!!

<!-- ## Dev server webpack config to proxy /api queries to heroku backed
<https://webpack.js.org/configuration/dev-server/#devserverproxy>

```json
devServer: {
    // Set proxy to backend so /api/movies goes to https:[backend-url]/movies
    proxy: {
      "/api": {
        target: "https://calm-waters-80883.herokuapp.com",
        pathRewrite: { "^/api": "" },
        secure: false,           // important!
        changeOrigin: true,      // important!
      },
    },
  },
``` -->
