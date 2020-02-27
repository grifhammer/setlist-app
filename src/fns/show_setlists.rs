use super::super::models::*;
use super::super::*;
use diesel::prelude::*;
fn main(connection: PostgresConn) {
    use super::super::schema::setlists::dsl::*;

    let results = setlists
        .filter(published.eq(true))
        .limit(5)
        .load::<Setlist>(&connection.connection)
        .expect("Error loading posts");

    for setlist in results {
        println!("{}, {}", setlist.id, setlist.title);
    }
}
