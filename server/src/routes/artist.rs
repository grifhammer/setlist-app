use crate::apis::setlist_fm::SetlistFMAPI;
use crate::resources::db::Pool;
use actix_web::web::Json;
use actix_web::{get, web, Responder};
use std::env;

#[get("/artist/{artist_name}")]
async fn artist(artist_name: web::Path<String>, pool: web::Data<Pool>) -> impl Responder {
    let setlist_fm_api_key = env::var("SETLIST_FM_KEY").expect("SETLIST_FM_KEY must be set");

    let result = SetlistFMAPI::new(setlist_fm_api_key.to_owned().to_string())
        .search_artists(artist_name.as_str());
    Json(result.await.unwrap())
}
