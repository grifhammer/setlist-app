table! {
    artists (id) {
        id -> Int4,
        mbid -> Varchar,
        spotify_id -> Varchar,
        name -> Text,
    }
}

table! {
    setlists (id) {
        id -> Int4,
        title -> Text,
        published -> Bool,
    }
}

allow_tables_to_appear_in_same_query!(
    artists,
    setlists,
);
