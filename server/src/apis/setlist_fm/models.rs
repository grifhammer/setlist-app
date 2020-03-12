use serde::Deserialize;
use std::fmt;

#[derive(Deserialize, Clone, Default)]
pub struct SetlistFMSetlist {
    pub artist: SetlistFMArtist,
    pub venue: SetlistFMVenue,
    pub sets: Option<SetlistFMSets>,
}

#[derive(Deserialize, Clone, Default)]
pub struct SetlistFMSets {
    pub set: Option<Vec<SetlistFMSet>>,
}

#[derive(Deserialize, Clone, Default)]
pub struct SetlistFMSet {
    pub name: Option<String>,
    pub song: Vec<SetlistFMSong>,
}

#[derive(Deserialize, Clone, Default)]
pub struct SetlistFMSong {
    pub name: String,
    pub info: Option<String>,
}

#[derive(Deserialize, Clone, Default)]
pub struct SetlistFMVenue {
    pub name: String,
}

#[derive(Deserialize, Clone, Default)]
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
