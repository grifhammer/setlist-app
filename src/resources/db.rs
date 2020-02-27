use diesel::PgConnection;
use rocket_contrib::database;

#[database("postgres")]
pub struct PostgresConn(PgConnection);
