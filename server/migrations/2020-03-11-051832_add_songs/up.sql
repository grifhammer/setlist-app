CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    setlist_id INT NOT NULL,
    FOREIGN KEY (setlist_id) REFERENCES setlists(id)
);