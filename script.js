$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com?apikey=dca61bcc&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      //ketika tombol detail di klik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com?apikey=dca61bcc&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showMovieDetail(m);

            $(".modal-body").html(movieDetail);
          },
          error: (error) => console.log(error.responseText),
        });
      });
    },
    error: (error) => console.log(error.responseText),
  });
});

function showCards(m) {
  return `<div class=" col-sm-4 p-2">
  <div class="card" >
    <img  src=${m.Poster}  class="card-img-top " alt="" />
    <div class="card-body">
      <h6 class="card-title">${m.Title}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
      <a data-bs-toggle="modal" data-bs-target="#movie-detail" href="#" class="btn btn-primary modal-detail-button" data-imdbid="${m.imdbID}">Show Detail</a>
    </div>
  </div>
</div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img class="img-fluid w-3" src=${m.Poster} alt="" />
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
        <li class="list-group-item">
          Director: <strong>${m.Director}</strong>
        </li>
        <li class="list-group-item">
          Actor <strong>${m.Actors}</strong>
        </li>
        <li class="list-group-item">
          Writer : <strong>${m.Writer}</strong>
        </li>
        <li class="list-group-item">
          Plot: <strong><br />${m.Plot}</strong>
        </li>
      </ul>
    </div>
  </div>
</div>`;
}
