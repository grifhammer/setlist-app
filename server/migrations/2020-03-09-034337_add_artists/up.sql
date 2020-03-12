CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    mbid VARCHAR NOT NULL,
    spotify_id VARCHAR,
    name TEXT NOT NULL,
    UNIQUE (mbid) 
);

ALTER TABLE setlists ADD COLUMN artist_mbid VARCHAR NOT NULL;
ALTER TABLE setlists ADD CONSTRAINT fk_mbid FOREIGN KEY (artist_mbid) REFERENCES artists(mbid);
