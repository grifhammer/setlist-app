#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate rocket_contrib;

use rocket_contrib::json::*;
use setlist_app::fns::show_setlists;
use setlist_app::models::*;
use setlist_app::resources::db::PostgresConn;

#[get("/api")]
fn index(connection: PostgresConn) -> Json<Vec<Setlist>> {
    Json(show_setlists(connection))
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index])
        .attach(PostgresConn::fairing())
        .launch();
}
