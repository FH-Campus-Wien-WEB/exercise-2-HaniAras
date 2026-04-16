window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);

      const pageTitle = document.createElement("h1")
      pageTitle.textContent = "Movie Collection"
      bodyElement.append(pageTitle)

      for (const movie of movies) {
        const article = document.createElement("article")

        // NEU (Task 1.3): imdbID als id-Attribut setzen
        article.id = movie.imdbID

        const title = document.createElement("h2")
        title.textContent = movie.Title
        article.append(title)

        const poster = document.createElement("img")
        poster.src = movie.Poster
        poster.alt = movie.Title + " poster"
        article.append(poster)

        const released = document.createElement("p")
        released.className = "info-block"
        released.innerHTML = "<span class='meta'>Released:</span> " + movie.Released
        article.append(released)

        const runtime = document.createElement("p")
        runtime.className = "info-block"
        runtime.innerHTML = "<span class='meta'>Runtime:</span> " + movie.Runtime + " min"
        article.append(runtime)

        const genres = document.createElement("p")
        genres.className = "info-block"
        genres.innerHTML = "<span class='meta'>Genres:</span> "
        movie.Genres.forEach(function (genre) {
          const genreSpan = document.createElement("span")
          genreSpan.className = "genre"
          genreSpan.textContent = genre
          genres.append(genreSpan)
        })
        article.append(genres)

        const directors = document.createElement("p")
        directors.className = "info-block"
        directors.innerHTML = "<span class='meta'>Directors:</span> " + movie.Directors.join(", ")
        article.append(directors)

        const writers = document.createElement("p")
        writers.className = "info-block"
        writers.innerHTML = "<span class='meta'>Writers:</span> " + movie.Writers.join(", ")
        article.append(writers)

        const actors = document.createElement("p")
        actors.className = "info-block"
        actors.innerHTML = "<span class='meta'>Actors:</span> " + movie.Actors.join(", ")
        article.append(actors)

        const plot = document.createElement("p")
        plot.className = "info-block"
        plot.innerHTML = "<span class='meta'>Plot:</span> " + movie.Plot
        article.append(plot)

        const metascore = document.createElement("p")
        metascore.className = "info-block"
        metascore.innerHTML = "<span class='meta'>Metascore:</span> " + movie.Metascore
        article.append(metascore)

        const imdbRating = document.createElement("p")
        imdbRating.className = "info-block"
        imdbRating.innerHTML = "<span class='meta'>IMDb Rating:</span> " + movie.imdbRating
        article.append(imdbRating)

        // NEU (Task 1.3 + 2.2): Edit-Button mit Navigation zu edit.html
        const editButton = document.createElement("button")
        editButton.textContent = "Edit"
        editButton.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID
        }
        article.append(editButton)

        bodyElement.append(article)
      }

    } else {
      bodyElement.append(
          "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};