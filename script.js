fetch("E:\PROJECT FILES/Netflex_clone/netflix_clone/Assets/tmdb_5000_credits.csv")
.then(response=>response.json())
.then(data=>console.log(data))
.then(error=>console.log("Error:",error))
// Note: Fetching a local CSV file using fetch() may not work due to CORS restrictions.