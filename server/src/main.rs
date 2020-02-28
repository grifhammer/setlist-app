#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate rocket_contrib;
extern crate rocket_cors;

use rocket::http::Method;
use rocket_contrib::json::*;
use rocket_cors::{AllowedHeaders, AllowedOrigins, Error};
use setlist_app::fns::show_setlists;
use setlist_app::models::*;
use setlist_app::resources::db::PostgresConn;

#[get("/api")]
fn index(connection: PostgresConn) -> Json<Vec<Setlist>> {
    Json(show_setlists(connection))
}

fn main() -> Result<(), Error> {
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
        .mount("/", routes![index])
        .attach(cors)
        .attach(PostgresConn::fairing())
        .launch();
    Ok(())
}
