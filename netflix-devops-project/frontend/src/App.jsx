import { useState } from 'react'
import './App.css'
import MovieRow from './components/MovieRow'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [myList, setMyList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  const trendingMovies = [
    {
      title: 'Stranger Things',
      year: 2022,
      genre: 'Sci-Fi',
      description:
        'A group of friends uncover mysterious supernatural events in their small town.'
    },
    {
      title: 'Wednesday',
      year: 2022,
      genre: 'Fantasy',
      description:
        'Wednesday Addams investigates strange events while attending a mysterious academy.'
    },
    {
      title: 'Money Heist',
      year: 2021,
      genre: 'Crime',
      description:
        'A criminal mastermind leads a group through carefully planned heists.'
    },
    {
      title: 'The Witcher',
      year: 2023,
      genre: 'Fantasy',
      description:
        'A monster hunter travels across a dangerous world filled with magic and political conflict.'
    },
    {
      title: 'Dark',
      year: 2020,
      genre: 'Mystery',
      description:
        'A mysterious disappearance reveals secrets connecting several generations.'
    }
  ]

  const popularMovies = [
    {
      title: 'Breaking Bad',
      year: 2013,
      genre: 'Crime',
      description:
        'A chemistry teacher enters the world of illegal drug production.'
    },
    {
      title: 'Peaky Blinders',
      year: 2022,
      genre: 'Drama',
      description:
        'A powerful family builds its criminal empire in post-war Birmingham.'
    },
    {
      title: 'Lucifer',
      year: 2021,
      genre: 'Fantasy',
      description:
        'The Devil leaves Hell and becomes involved in solving crimes in Los Angeles.'
    },
    {
      title: 'Narcos',
      year: 2017,
      genre: 'Crime',
      description:
        'A crime drama exploring the rise and fall of powerful drug cartels.'
    },
    {
      title: 'Squid Game',
      year: 2021,
      genre: 'Thriller',
      description:
        'Desperate contestants enter a mysterious competition where losing has deadly consequences.'
    }
  ]

  const allMovies = [
    ...trendingMovies,
    ...popularMovies
  ]

  const filteredMovies = allMovies.filter((movie) =>
    movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const handleLogin = () => {
    if (username.trim() === '') {
      alert('Please enter username')
      return
    }

    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
  }

  const handleToggleList = (movie) => {
    setMyList((currentList) => {
      const alreadyExists = currentList.some(
        (item) => item.title === movie.title
      )

      if (alreadyExists) {
        return currentList.filter(
          (item) => item.title !== movie.title
        )
      }

      return [...currentList, movie]
    })
  }

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseMovie = () => {
    setSelectedMovie(null)
  }

  return (
    <div className="app">

      {/* Navigation */}
      <header className="navbar">

        <div className="logo">
          NETFLIX TRAINING
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <nav>

          <a href="#home">Home</a>

          <a href="#movies">Movies</a>

          <a href="#my-list">
            My List ({myList.length})
          </a>

          {!isLoggedIn ? (
            <button
              className="login-button"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          ) : (
            <>
              <span className="welcome-user">
                Welcome, {username}
              </span>

              <button
                className="login-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </nav>

      </header>

      {/* Hero */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="hero-label">
            NETFLIX TRAINING PLATFORM
          </p>

          <h1>
            Watch. Explore. Discover.
          </h1>

          <p>
            Explore movies, discover new content and
            build your personalized watch list.
          </p>

          <button
            className="watch-button"
            onClick={() =>
              document
                .getElementById('movies')
                .scrollIntoView()
            }
          >
            ▶ Start Watching
          </button>

        </div>

      </section>

      {/* Login */}
      {showLogin && !isLoggedIn && (
        <div className="login-overlay">

          <div className="login-box">

            <h2>Login</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button
              className="login-submit"
              onClick={handleLogin}
            >
              Login
            </button>

            <button
              className="login-close"
              onClick={() => setShowLogin(false)}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* Movies */}
      <div id="movies">

        <MovieRow
          title="Trending Now"
          movies={trendingMovies}
          myList={myList}
          onToggleList={handleToggleList}
          onSelectMovie={handleSelectMovie}
        />

        <MovieRow
          title="Popular Movies"
          movies={popularMovies}
          myList={myList}
          onToggleList={handleToggleList}
          onSelectMovie={handleSelectMovie}
        />

        {searchTerm && (
          <MovieRow
            title={`Search Results for "${searchTerm}"`}
            movies={filteredMovies}
            myList={myList}
            onToggleList={handleToggleList}
            onSelectMovie={handleSelectMovie}
          />
        )}

        {/* My List */}
        {myList.length > 0 && (
          <div id="my-list">

            <MovieRow
              title="My List"
              movies={myList}
              myList={myList}
              onToggleList={handleToggleList}
              onSelectMovie={handleSelectMovie}
            />

          </div>
        )}

      </div>

      {/* Movie Details */}
      {selectedMovie && (
        <div
          className="movie-details-overlay"
          onClick={handleCloseMovie}
        >

          <div
            className="movie-details-box"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="movie-details-close"
              onClick={handleCloseMovie}
            >
              ✕
            </button>

            <div className="movie-details-number">
              {selectedMovie.title.charAt(0)}
            </div>

            <h2>
              {selectedMovie.title}
            </h2>

            <p className="movie-details-meta">
              {selectedMovie.year} • {selectedMovie.genre}
            </p>

            <p className="movie-details-description">
              {selectedMovie.description}
            </p>

            <div className="movie-details-actions">

              <button className="watch-button">
                ▶ Watch Now
              </button>

              <button
                className="list-button details-list-button"
                onClick={() =>
                  handleToggleList(selectedMovie)
                }
              >
                {myList.some(
                  (item) =>
                    item.title === selectedMovie.title
                )
                  ? '✓ My List'
                  : '+ My List'}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Footer */}
      <footer>

        <p>
          Netflix Training Platform
        </p>

        <p>
          DevOps & SRE Learning Project
        </p>

      </footer>

    </div>
  )
}

export default App
