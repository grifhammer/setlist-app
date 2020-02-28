use super::models::*;
use super::resources::db::PostgresConn;
use super::*;
use diesel::prelude::*;
pub fn show_setlists(connection: PostgresConn) -> Vec<Setlist> {
    use super::schema::setlists::dsl::*;

    let results = setlists
        .filter(published.eq(true))
        .limit(5)
        .load::<Setlist>(&*connection)
        .expect("Error loading posts");

    for setlist in &results {
        println!("{}, {}", setlist.id, setlist.title);
    }
    results
}
