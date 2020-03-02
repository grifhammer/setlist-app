#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate dotenv;
extern crate rocket_contrib;
extern crate rocket_cors;

use dotenv::dotenv;
use rocket::config::{Config, Environment};
use rocket::http::Method;
use rocket::State;
use rocket_contrib::json::*;
use rocket_cors::{AllowedHeaders, AllowedOrigins, Error};
use setlist_app::apis::setlist_fm::*;
use setlist_app::fns::show_setlists;
use setlist_app::models::*;
use setlist_app::resources::db::PostgresConn;
use std::env;

struct MyAppState {
    setlist_fm_api_key: String,
}

#[get("/api")]
fn index(connection: PostgresConn) -> Json<Vec<Setlist>> {
    Json(show_setlists(connection))
}

#[get("/artist/<artist>")]
fn artist(connection: PostgresConn, state: State<MyAppState>, artist: String) -> () {
    Json(SetlistFMAPI::new(state.setlist_fm_api_key.to_owned()).search_artists(artist.as_str()));
}

fn main() -> Result<(), Error> {
    dotenv().ok();

    let mut setlist_fm_api_key: String = env::var("SETLIST_FM_KEY")
        .expect("SETLIST_FM_KEY must be set")
        .as_str()
        .to_owned();
    let app: MyAppState = MyAppState {
        setlist_fm_api_key: setlist_fm_api_key,
    };

    let config = Config::build(Environment::Development)
        .address("1.2.3.4")
        .port(9234)
        .finalize()
        .unwrap();

    let allowed_origins = AllowedOrigins::all();
    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()?;
    rocket::ignite()
        .mount("/", routes![index, artist])
        .attach(cors)
        .manage(app)
        .attach(PostgresConn::fairing())
        .launch();
    Ok(())
}
