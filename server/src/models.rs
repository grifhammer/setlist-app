use crate::apis::setlist_fm::{SetlistFMArtist, SetlistFMSetlist};
use crate::errors::AppError;
use crate::schema::{artists, setlists};
use actix_web::{HttpRequest, HttpResponse, Responder};
use diesel::prelude::*;
use futures::future::{ready, Ready};
use serde::Serialize;

type Result<T> = std::result::Result<T, AppError>;

#[derive(Queryable, Identifiable, Serialize, Debug, PartialEq)]
pub struct Setlist {
    pub id: i32,
    pub title: String,
    pub published: bool,
}

impl Responder for Setlist {
    type Error = AppError;
    type Future = Ready<Result<HttpResponse>>;

    fn respond_to(self, _req: &HttpRequest) -> Self::Future {
        let body = serde_json::to_string(&self).unwrap();

        ready(Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(body)))
    }
}

impl From<SetlistFMSetlist> for Setlist {
    fn from(setlist: SetlistFMSetlist) -> Self {
        Setlist {
            id: 1,
            title: setlist.venue.name.clone(),
            published: true,
        }
    }
}

#[derive(Queryable, Identifiable, Serialize, Debug, PartialEq)]
pub struct Artist {
    pub id: i32,
    pub name: String,
    pub spotify_id: Option<String>,
    pub mbid: String,
}

impl From<SetlistFMArtist> for Artist {
    fn from(setlist_artist: SetlistFMArtist) -> Self {
        Artist {
            id: 1,
            name: setlist_artist.name.clone(),
            spotify_id: None,
            mbid: setlist_artist.mbid.clone(),
        }
    }
}

impl Responder for Artist {
    type Error = AppError;
    type Future = Ready<Result<HttpResponse>>;

    fn respond_to(self, _req: &HttpRequest) -> Self::Future {
        let body = serde_json::to_string(&self).unwrap();

        ready(Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(body)))
    }
}

pub enum ArtistKey<'a> {
    Name(&'a str),
    ID(i32),
    MBID(&'a str),
    SpotifyId(&'a str),
}

pub fn create_artist(conn: &PgConnection, name: &str, mbid: &str) -> Result<Artist> {
    diesel::insert_into(artists::table)
        .values((artists::name.eq(name), artists::mbid.eq(mbid)))
        .get_result(conn)
        .map_err(AppError::from)
}

pub fn find_artist<'a>(conn: &PgConnection, key: ArtistKey<'a>) -> Result<Artist> {
    match key {
        ArtistKey::Name(name) => artists::table
            .filter(artists::name.eq(name))
            .first::<Artist>(conn)
            .map_err(AppError::from),
        ArtistKey::ID(id) => artists::table
            .filter(artists::id.eq(id))
            .first::<Artist>(conn)
            .map_err(AppError::from),
        ArtistKey::MBID(mbid) => artists::table
            .filter(artists::mbid.eq(mbid))
            .first::<Artist>(conn)
            .map_err(AppError::from),
        ArtistKey::SpotifyId(spotify_id) => artists::table
            .filter(artists::spotify_id.eq(spotify_id))
            .first::<Artist>(conn)
            .map_err(AppError::from),
    }
}

pub fn get_setlists(conn: &PgConnection) -> Vec<Setlist> {
    println!("Getting setlists");
    setlists::table
        .limit(5)
        .load::<Setlist>(conn)
        .expect("Error loading setlists")
}

// pub fn create_setlist() {}
