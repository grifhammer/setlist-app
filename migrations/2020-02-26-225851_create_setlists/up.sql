CREATE TABLE setlists (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    published BOOLEAN NOT NULL DEFAULT 'f'
);