import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  activePage = 'dashboard'

  showMovieForm = false

  // Used to know whether we are adding or editing
  editingMovie: any = null

  // Used by app.html to display Add/Edit text
  isEditMode = false

  newMovie = {
    title: '',
    genre: '',
    year: '',
    description: ''
  }

  movies = [
    {
      title: 'Stranger Things',
      genre: 'Sci-Fi',
      year: 2022,
      description: 'A group of friends uncover mysterious supernatural events.',
      status: 'Active'
    },
    {
      title: 'Wednesday',
      genre: 'Fantasy',
      year: 2022,
      description: 'Wednesday investigates strange events at a mysterious academy.',
      status: 'Active'
    },
    {
      title: 'Breaking Bad',
      genre: 'Crime',
      year: 2013,
      description: 'A chemistry teacher enters the world of illegal drug production.',
      status: 'Active'
    },
    {
      title: 'Money Heist',
      genre: 'Crime',
      year: 2021,
      description: 'A criminal mastermind plans a series of carefully executed heists.',
      status: 'Active'
    },
    {
      title: 'The Witcher',
      genre: 'Fantasy',
      year: 2023,
      description: 'A monster hunter travels through a dangerous world of magic.',
      status: 'Active'
    }
  ]

  users = [
    {
      name: 'Santosh',
      email: 'santosh@example.com',
      status: 'Active'
    },
    {
      name: 'Rahul',
      email: 'rahul@example.com',
      status: 'Active'
    },
    {
      name: 'Priya',
      email: 'priya@example.com',
      status: 'Inactive'
    }
  ]

  subscriptions = [
    {
      user: 'Santosh',
      plan: 'Premium',
      status: 'Active'
    },
    {
      user: 'Rahul',
      plan: 'Standard',
      status: 'Active'
    },
    {
      user: 'Priya',
      plan: 'Basic',
      status: 'Expired'
    }
  ]


  // =========================
  // SIDEBAR
  // =========================

  showPage(page: string) {
    this.activePage = page
  }


  // =========================
  // LOGOUT
  // =========================

  logout() {
    alert('Admin logout clicked')
  }


  // =========================
  // OPEN ADD MOVIE FORM
  // =========================

  openMovieForm() {

    // Clear edit mode
    this.editingMovie = null
    this.isEditMode = false

    // Clear old form values
    this.newMovie = {
      title: '',
      genre: '',
      year: '',
      description: ''
    }

    // Open modal
    this.showMovieForm = true
  }


  // =========================
  // EDIT MOVIE
  // =========================

  editMovie(movie: any) {

    // Store the movie being edited
    this.editingMovie = movie

    // Enable edit mode
    this.isEditMode = true

    // Copy existing movie values into the form
    this.newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year,
      description: movie.description
    }

    // Open the form
    this.showMovieForm = true
  }


  // =========================
  // CLOSE MOVIE FORM
  // =========================

  closeMovieForm() {

    this.showMovieForm = false

    this.editingMovie = null

    this.isEditMode = false

    this.newMovie = {
      title: '',
      genre: '',
      year: '',
      description: ''
    }
  }


  // =========================
  // SAVE MOVIE
  // =========================

  saveMovie() {

    // Validate required fields
    if (
      this.newMovie.title.trim() === '' ||
      this.newMovie.genre.trim() === '' ||
      this.newMovie.year === ''
    ) {

      alert('Please fill Title, Genre and Year')

      return
    }


    const title = this.newMovie.title.trim()

    const genre = this.newMovie.genre.trim()

    const year = Number(this.newMovie.year)

    const description = this.newMovie.description.trim()


    // =========================
    // UPDATE EXISTING MOVIE
    // =========================

    if (this.editingMovie) {

      this.editingMovie.title = title

      this.editingMovie.genre = genre

      this.editingMovie.year = year

      this.editingMovie.description = description

      this.closeMovieForm()

      alert('Movie updated successfully')

      return
    }


    // =========================
    // ADD NEW MOVIE
    // =========================

    const movie = {

      title: title,

      genre: genre,

      year: year,

      description: description,

      status: 'Active'

    }

    this.movies.push(movie)

    this.closeMovieForm()

    alert('Movie added successfully')
  }


  // =========================
  // DELETE MOVIE
  // =========================

  deleteMovie(movie: any) {

    const confirmed = confirm(
      'Are you sure you want to delete ' + movie.title + '?'
    )

    if (confirmed) {

      this.movies = this.movies.filter(
        item => item !== movie
      )

    }
  }

}
