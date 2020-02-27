#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use setlist_app::fns::show_setlists;
use setlist_app::PostgresConn;

#[get("/")]
fn index() -> &'static str {
    show_setlists(connection);
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index])
        .attach(PostgresConn::faring())
        .launch();
}
