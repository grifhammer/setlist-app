CREATE TABLE setlists (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT 'f'
);