use crate::models::*;
use reqwest::{Client, Response};
use serde::Deserialize;
use std::fmt;

static SETLIST_FM_URL: &str = "https://api.setlist.fm/rest/1.0/";

#[derive(Deserialize)]
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
    artist: Vec<SetlistFMArtist>,
}

fn mask_error(err: reqwest::Error) -> () {
    println!("unwrap error masking, {:?}", err);
}

impl SetlistFMAPI {
    pub fn new(api_key: String) -> SetlistFMAPI {
        const version: &'static str = "v1";
        let client: reqwest::Client = Client::new();
        let settings: Settings = Settings::new(version, api_key);
        SetlistFMAPI { settings, client }
    }

    pub async fn search_artists(self, artist: &str) -> Result<Vec<Artist>, reqwest::Error> {
        let request_url = generate_request_url(SetlistFMEndpoint::ArtistSearch, artist);
        let res: ArtistSearchResult = Client::new()
            .get(request_url.as_str())
            .header("x-api-key", self.settings.APIkey.as_str())
            .header("Accept", "application/json")
            .send()
            .await
            .unwrap()
            .json::<ArtistSearchResult>()
            .await
            .unwrap();

        let first_artist = &res.artist[0];

        // copy the response body directly to stdout
        // res.copy_to(&mut std::io::stdout())?;

        let mut return_val = Vec::new();
        return_val.push(Artist::from(first_artist));
        return_val.push(Artist::from(&res.artist[1]));
        return_val.push(Artist::from(&res.artist[2]));
        return_val.push(Artist::from(&res.artist[3]));
        return_val.push(Artist::from(&res.artist[4]));
        println!("\n\nDone.");
        Ok(return_val)
    }
}

fn generate_request_url(endpoint: SetlistFMEndpoint, artist: &str) -> String {
    match endpoint {
        SetlistFMEndpoint::ArtistSearch => {
            format!("{}search/artists?artistName={}", SETLIST_FM_URL, artist)
        }
    }
}
