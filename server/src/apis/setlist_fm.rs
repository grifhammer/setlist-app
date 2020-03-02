use reqwest::Client;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::request::{self, FromRequest, Outcome, Request};
use serde::Deserialize;

static SETLIST_FM_URL: &str = "https://api.setlist.fm/rest/1.0/";

#[derive(Deserialize)]
struct SetlistFMArtist {
    mbid: String,
    tmid: String,
    name: String,
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
    pub fn new(version: &'static str, APIkey: String) -> Settings {
        Settings { version, APIkey }
    }
}

impl SetlistFMAPI {
    pub fn new(APIkey: String) -> SetlistFMAPI {
        const version: &'static str = "v1";
        let client: reqwest::Client = Client::new();
        let settings: Settings = Settings::new(version, APIkey);
        SetlistFMAPI { settings, client }
    }

    pub async fn search_artists(self, artist: &str) -> Result<(), reqwest::Error> {
        let request_url = generate_request_url(SetlistFMEndpoint::ArtistSearch, artist);
        println!("TESTING LOG");
        println!("{}", request_url);
        let res = Client::new()
            .get(request_url.as_str())
            .header("x-api-key", self.settings.APIkey.as_str())
            .send()
            .await?;

        println!("JSON: {}", res.text().await?);

        // copy the response body directly to stdout
        // res.copy_to(&mut std::io::stdout())?;

        println!("\n\nDone.");
        Ok(())
    }
}

fn generate_request_url(endpoint: SetlistFMEndpoint, artist: &str) -> String {
    match endpoint {
        SetlistFMEndpoint::ArtistSearch => {
            format!("{}search/artists?artistName={}", SETLIST_FM_URL, artist)
        }
    }
}
