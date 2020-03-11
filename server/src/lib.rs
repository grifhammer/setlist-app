#[macro_use]
extern crate diesel;
extern crate actix;
extern crate actix_web;
extern crate dotenv;
extern crate reqwest;
extern crate serde;
extern crate url;

mod apis;
mod errors;
mod models;
mod resources;
mod routes;
mod schema;

use actix_cors::Cors;
use actix_web::{http, middleware, App, HttpServer};
use diesel::r2d2::{self, ConnectionManager};
use diesel::PgConnection;

pub struct SetlistApp {
    port: u16,
}

impl SetlistApp {
    pub fn new(port: u16) -> Self {
        SetlistApp { port }
    }

    pub async fn run(
        &self,
        database_url: String,
        setlist_fm_api_key: String,
    ) -> std::io::Result<()> {
        let manager = ConnectionManager::<PgConnection>::new(database_url);
        let pool = r2d2::Pool::builder()
            .build(manager)
            .expect("Failed to create a connection pool");
        println!("Starting http server 127.0.0.1:{}.", self.port);
        HttpServer::new(move || {
            App::new()
                .wrap(
                    Cors::new()
                        .allowed_methods(vec!["GET", "POST"])
                        .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
                        .allowed_header(http::header::CONTENT_TYPE)
                        .max_age(3600)
                        .finish(),
                )
                .data(pool.clone())
                .data(setlist_fm_api_key.to_owned())
                .wrap(middleware::Logger::default())
                .service(routes::index::index)
                .service(routes::artist::artist)
                .service(routes::artist::setlists)
        })
        .bind(("127.0.0.1", self.port))?
        .run()
        .await
    }
}
