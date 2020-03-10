CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    mbid VARCHAR NOT NULL,
    spotify_id VARCHAR NOT NULL,
    name TEXT NOT NULL
);