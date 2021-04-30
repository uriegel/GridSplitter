#[tokio::main]
async fn main() {
    let port = 9866;
    println!("Running test server on http://localhost:{}", port);

     warp::serve(warp::fs::dir("/home/uwe/Projekte/GridSplitter"))
        .run(([127, 0, 0, 1], port))
        .await;        
}
