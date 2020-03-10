CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    mbid VARCHAR NOT NULL,
    spotify_id VARCHAR,
    name TEXT NOT NULL
);