import MovieCard from './MovieCard'

function MovieRow({
  title,
  movies,
  myList,
  onToggleList,
  onSelectMovie
}) {
  return (
    <section className="movie-section">

      <h2>{title}</h2>

      <div className="movie-row">

        {movies.map((movie, index) => (
          <MovieCard
            key={movie.title}
            movie={movie}
            index={index}
            isInList={myList.some(
              (item) => item.title === movie.title
            )}
            onToggleList={onToggleList}
            onSelectMovie={onSelectMovie}
          />
        ))}

      </div>

    </section>
  )
}

export default MovieRow
