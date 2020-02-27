use diesel::Queryable;

#[derive(Queryable)]
pub struct Setlist {
    pub id: i32,
    pub title: String,
    pub published: bool,
}
