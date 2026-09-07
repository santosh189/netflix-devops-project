function MovieCard({
  movie,
  index,
  isInList,
  onToggleList,
  onSelectMovie
}) {
  return (
    <div
      className="movie-card"
      onClick={() => onSelectMovie(movie)}
    >

      <div className="movie-number">
        {index + 1}
      </div>

      <div className="movie-title">
        {movie.title}
      </div>

      <div className="movie-year">
        {movie.year} • {movie.genre}
      </div>

      <button
        className="list-button"
        onClick={(event) => {
          event.stopPropagation()
          onToggleList(movie)
        }}
      >
        {isInList ? '✓ My List' : '+ My List'}
      </button>

    </div>
  )
}

export default MovieCard
