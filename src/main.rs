#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use setlist_app::fns::show_setlists;
use setlist_app::resources::db::PostgresConn;

#[get("/")]
fn index(connection: PostgresConn) -> () {
    show_setlists(connection);
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index])
        .attach(PostgresConn::fairing())
        .launch();
}
