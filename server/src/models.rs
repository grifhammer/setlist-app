use diesel::Queryable;
use serde::Serialize;

#[derive(Queryable, Serialize)]
pub struct Setlist {
    pub id: i32,
    pub title: String,
    pub published: bool,
}
