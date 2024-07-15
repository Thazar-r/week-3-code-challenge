document.addEventListener('DOMContentLoaded', () => {
  const filmsList = document.getElementById('films');
  const movieDetails = document.getElementById('movie-details');

  // Function to fetch and display movie details
  const fetchMovieDetails = async (id) => {
      try {
          const response = await fetch(`http://localhost:3000/films/${id}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const movie = await response.json();
          displayMovieDetails(movie);
      } catch (error) {
          console.error('Error fetching movie details:', error);
      }
  };

  // Function to display movie details
  const displayMovieDetails = (movie) => {
      const { title, poster, runtime, showtime, capacity, tickets_sold, description } = movie;
      const availableTickets = capacity - tickets_sold;
      
      movieDetails.innerHTML = `
          <div class="movie-details">
              <img src="${poster}" alt="${title} Poster">
              <h2>${title}</h2>
              <p><strong>Description:</strong> ${description}</p>
              <p><strong>Runtime:</strong> ${runtime} mins</p>
              <p><strong>Showtime:</strong> ${showtime}</p>
              <p><strong>Available Tickets:</strong> <span id="available-tickets">${availableTickets}</span></p>
              <button id="buy-ticket">Buy Ticket</button>
          </div>
      `;

      const buyTicketButton = document.getElementById('buy-ticket');
      buyTicketButton.addEventListener('click', async () => {
          if (availableTickets > 0) {
              // Reduce available tickets and update UI
              movie.tickets_sold++;
              const updatedTickets = await updateTicketsSold(movie.id, movie.tickets_sold);
              displayMovieDetails(updatedTickets);

              // Optional: Handle sold out state and update UI accordingly
              if (updatedTickets.tickets_sold === updatedTickets.capacity) {
                  buyTicketButton.textContent = 'Sold Out';
                  const filmItem = filmsList.querySelector(`li[data-id="${movie.id}"]`);
                  filmItem.classList.add('sold-out');
              }
          } else {
              alert('Sorry, this movie is sold out.');
          }
      });
  };

  // Function to update tickets_sold on the server
  const updateTicketsSold = async (id, newTicketsSold) => {
      try {
          const response = await fetch(`http://localhost:3000/films/${id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  tickets_sold: newTicketsSold,
              }),
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const updatedMovie = await response.json();
          return updatedMovie;
      } catch (error) {
          console.error('Error updating tickets sold:', error);
      }
  };

  // Function to fetch all movies and populate the sidebar
  const fetchAllMovies = async () => {
      try {
          const response = await fetch('http://localhost:3000/films');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const movies = await response.json();
          movies.forEach(movie => addMovieToList(movie));
          // Display details of the first movie by default
          if (movies.length > 0) {
              fetchMovieDetails(movies[0].id);
          }
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };

  // Function to add a movie to the sidebar
  const addMovieToList = (movie) => {
      const { id, title } = movie;
      const li = document.createElement('li');
      li.textContent = title;
      li.classList.add('film', 'item');
      li.setAttribute('data-id', id);
      li.addEventListener('click', () => fetchMovieDetails(id));
      filmsList.appendChild(li);
  };

  // Initialize the app
  fetchAllMovies();
});
