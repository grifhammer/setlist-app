use dotenv::dotenv;
use setlist_app::SetlistApp;
use std::env;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let setlist_fm_api_key = env::var("SETLIST_FM_KEY").expect("SETLIST_FM_KEY must be set");

    let app = SetlistApp::new(8000);
    app.run(database_url, setlist_fm_api_key).await
}
