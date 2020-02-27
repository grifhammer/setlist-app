use reqwest::Error;
use serde::Deserialize;

#[derive(Deserialize)]
struct SetlistFMArtist {
    mbid: String,
    tmid: String,
    name: String,
}
fn search_artists(artist: String) {}
