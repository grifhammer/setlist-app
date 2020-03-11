use crate::apis::setlist_fm::SetlistFMAPI;
use crate::errors::AppError;
use crate::resources::db::Pool;
use actix_web::{get, web, HttpResponse};
use std::env;

#[get("/artist/{artist_name}")]
async fn artist(
    artist_name: web::Path<String>,
    _pool: web::Data<Pool>,
) -> Result<HttpResponse, AppError> {
    let setlist_fm_api_key = env::var("SETLIST_FM_KEY").expect("SETLIST_FM_KEY must be set");

    let result = SetlistFMAPI::new(setlist_fm_api_key.to_owned().to_string())
        .search_artists(artist_name.as_str());
    Ok(HttpResponse::Ok().json(result.await.unwrap()))
}

#[get("/artist/{mbid}/setlists")]
async fn setlists(
    mbid: web::Path<String>,
    _pool: web::Data<Pool>,
) -> Result<HttpResponse, AppError> {
    let setlist_fm_api_key = env::var("SETLIST_FM_KEY").expect("SETLIST_FM_KEY must be set");

    let result =
        SetlistFMAPI::new(setlist_fm_api_key.to_owned().to_string()).search_setlist(mbid.as_str());
    Ok(HttpResponse::Ok().json(result.await.unwrap()))
}
