#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate rocket_contrib;

#[database("setlist")]
pub struct PostgresConn(PgConnection);

pub mod fns;
pub mod models;
pub mod schema;
