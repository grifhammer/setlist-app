pub mod models;

use crate::models::*;
use models::{SetlistFMArtist, SetlistFMSet, SetlistFMSetlist, SetlistFMSong};
use reqwest::Client;
use serde::{Deserialize, Serialize};

static SETLIST_FM_URL: &str = "https://api.setlist.fm/rest/1.0/";

#[derive(Serialize)]
pub struct SetlistSearchResponse {
    details: Setlist,
    songs: Vec<Song>,
}

enum SetlistFMEndpoint {
    ArtistSearch,
    SetlistSearch,
}

#[derive(Deserialize)]
struct ArtistSearchResult {
    itemsPerPage: i32,
    page: i32,
    total: i32,
    artist: Vec<SetlistFMArtist>,
}

#[derive(Deserialize)]
struct SetlistSearchResult {
    itemsPerPage: i32,
    page: i32,
    total: i32,
    setlist: Vec<SetlistFMSetlist>,
}

pub struct SetlistFMAPI {
    settings: Settings,
    client: Client,
}

struct Settings {
    version: &'static str,
    APIkey: String,
}

impl Settings {
    pub fn new(version: &'static str, api_key: String) -> Settings {
        Settings {
            version,
            APIkey: api_key,
        }
    }
}

impl SetlistFMAPI {
    pub fn new(api_key: String) -> SetlistFMAPI {
        const VERSION: &'static str = "v1";
        let client: reqwest::Client = Client::new();
        let settings: Settings = Settings::new(VERSION, api_key);
        SetlistFMAPI { settings, client }
    }

    pub async fn search_artists(self, artist: &str) -> Result<Vec<Artist>, reqwest::Error> {
        let request_url = generate_request_url(SetlistFMEndpoint::ArtistSearch, artist);
        let res: ArtistSearchResult = self
            .client
            .get(request_url.as_str())
            .header("x-api-key", self.settings.APIkey.as_str())
            .header("Accept", "application/json")
            .send()
            .await
            .unwrap()
            .json::<ArtistSearchResult>()
            .await
            .unwrap();

        Ok(result_to_vec::<SetlistFMArtist, Artist>(res.artist))
    }

    pub async fn search_setlist(
        self,
        mbid: &str,
    ) -> Result<Vec<SetlistSearchResponse>, reqwest::Error> {
        let request_url = generate_request_url(SetlistFMEndpoint::SetlistSearch, mbid);
        let res = self
            .client
            .get(request_url.as_str())
            .header("x-api-key", self.settings.APIkey.as_str())
            .header("Accept", "application/json")
            .send()
            .await
            .unwrap();

        if res.status().is_success() {
            println!("Result Obtained for setlist search");
            let setlist_result = res.json::<SetlistSearchResult>().await.unwrap();
            Ok(setlist_result
                .setlist
                .iter()
                .map(|e: &SetlistFMSetlist| -> SetlistSearchResponse {
                    let sets: Vec<SetlistFMSet> =
                        e.sets.clone().unwrap_or_default().set.unwrap_or_default();
                    let songs: Vec<SetlistFMSong> = sets.iter().fold(Vec::new(), |mut acc, x| {
                        let mut to_append = x.song.clone();
                        acc.append(&mut to_append);
                        acc
                    });
                    SetlistSearchResponse {
                        details: Setlist::from(e.clone()),
                        songs: result_to_vec::<SetlistFMSong, Song>(songs),
                    }
                })
                .collect())
        } else {
            Ok(Vec::new())
        }
    }
}

fn result_to_vec<T: std::clone::Clone, F: From<T>>(initial: Vec<T>) -> Vec<F> {
    initial.iter().map(|e: &T| F::from(e.clone())).collect()
}

fn generate_request_url(endpoint: SetlistFMEndpoint, artist: &str) -> String {
    match endpoint {
        SetlistFMEndpoint::ArtistSearch => {
            format!("{}search/artists?artistName={}", SETLIST_FM_URL, artist)
        }
        SetlistFMEndpoint::SetlistSearch => format!("{}artist/{}/setlists", SETLIST_FM_URL, artist),
    }
}
