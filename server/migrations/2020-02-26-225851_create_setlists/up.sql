CREATE TABLE setlists (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    published BOOLEAN NOT NULL DEFAULT 'f'
);

CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    mbid VARCHAR,
    spotify_id VARCHAR,
    name VARCHAR,
);