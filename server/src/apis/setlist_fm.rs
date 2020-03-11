use crate::models::*;
use reqwest::Client;
use serde::Deserialize;
use std::fmt;

static SETLIST_FM_URL: &str = "https://api.setlist.fm/rest/1.0/";

#[derive(Deserialize, Clone)]
pub struct SetlistFMSetlist {
    pub artist: SetlistFMArtist,
    pub venue: SetlistFMVenue,
    pub sets: Option<SetlistFMSets>,
}

#[derive(Deserialize, Clone)]
pub struct SetlistFMSets {
    pub set: Option<Vec<SetlistFMSet>>,
}

#[derive(Deserialize, Clone)]
pub struct SetlistFMSet {
    pub name: Option<String>,
    pub song: Vec<SetlistFMSong>,
    pub encore: Option<i8>,
}

#[derive(Deserialize, Clone)]
pub struct SetlistFMSong {
    pub name: String,
    pub info: Option<String>,
}

#[derive(Deserialize, Clone)]
pub struct SetlistFMVenue {
    pub name: String,
}

#[derive(Deserialize, Clone)]
pub struct SetlistFMArtist {
    pub mbid: String,
    pub tmid: Option<String>,
    pub name: String,
    sortName: String,
    disambiguation: Option<String>,
    pub url: String,
}

impl fmt::Display for SetlistFMArtist {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "name: {}, mbid: {} url: {}, sortName: {}",
            self.name, self.mbid, self.url, self.sortName
        )
    }
}
enum SetlistFMEndpoint {
    ArtistSearch,
    SetlistSearch,
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

    pub async fn search_setlist(self, mbid: &str) -> Result<Vec<Setlist>, reqwest::Error> {
        let request_url = generate_request_url(SetlistFMEndpoint::SetlistSearch, mbid);
        let res: Result<SetlistSearchResult, reqwest::Error> = self
            .client
            .get(request_url.as_str())
            .header("x-api-key", self.settings.APIkey.as_str())
            .header("Accept", "application/json")
            .send()
            .await
            .unwrap()
            .json::<SetlistSearchResult>()
            .await;

        println!("Result Obtained for setlist search");
        let setlist_result = res.expect("Expecting result from setlist search");
        Ok(result_to_vec::<SetlistFMSetlist, Setlist>(
            setlist_result.setlist,
        ))
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
