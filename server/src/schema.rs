table! {
    artists (id) {
        id -> Int4,
        mbid -> Varchar,
        spotify_id -> Nullable<Varchar>,
        name -> Text,
    }
}

table! {
    setlists (id) {
        id -> Int4,
        title -> Text,
        published -> Bool,
        artist_mbid -> Varchar,
    }
}

table! {
    songs (id) {
        id -> Int4,
        name -> Varchar,
        setlist_id -> Int4,
    }
}

joinable!(songs -> setlists (setlist_id));

allow_tables_to_appear_in_same_query!(
    artists,
    setlists,
    songs,
);
