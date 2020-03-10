use crate::models::get_setlists;
use crate::resources::db::Pool;
use actix_web::web::Json;
use actix_web::{get, web, Responder};

#[get("/")]
async fn index(pool: web::Data<Pool>) -> impl Responder {
    Json(get_setlists(&pool.get().unwrap()))
}
