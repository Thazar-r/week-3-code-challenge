# week-3-code-challenge
Flatdango Movie Theater Application
Flatdango is a web application that allows users to browse and purchase movie tickets from Flatiron Movie Theater.

Table of Contents
Project Overview
Features
Setup Instructions
Usage
API Endpoints
Technologies Used
Contributing
License
Project Overview
Flatdango is designed to showcase movies available at Flatiron Movie Theater. Users can view details of each movie, including its poster, title, runtime, showtime, and available tickets. They can also purchase tickets for movies that have available seats. The application fetches data from a local JSON server to populate movie information dynamically.

Features
Display details of the first movie on page load.
Show a menu of all movies on the left sidebar.
Purchase tickets for available movies.
Highlight sold-out movies and disable ticket purchase buttons when no tickets are available.
Bonus: Click on a movie in the menu to replace the displayed movie's details.
Setup Instructions
To run Flatdango locally, follow these steps:

Clone the repository:

bash
Copy code
git clone <https://github.com/Thazar-r/week-3-code-challenge.git>
cd flatdango
Install dependencies:

Copy code
npm install
Start the JSON server:

Ensure you have JSON Server installed globally:

Copy code
npm install -g json-server
Start the JSON server using the provided db.json:

css
Copy code
json-server --watch db.json --port 3001
Run the application:

Open another terminal and run:

sql
Copy code
npm start
The application should now be running on http://localhost:3000.

Usage
Upon loading the application, the details of the first movie are displayed.
Navigate through the movie list on the left sidebar to view details of other movies.
Click "Buy Ticket" to purchase a ticket for available movies.
Sold-out movies are indicated by a "Sold Out" label and disabled ticket button.
API Endpoints
GET /films/1: Fetch details of the first movie.
GET /films: Fetch a list of all movies.
Technologies Used
HTML5, CSS3, JavaScript
React (for building the frontend)
JSON Server (for simulating the backend)
Axios (for making HTTP requests)
Contributing
Contributions are welcome! Here's how you can contribute to Flatdango:

Fork the repository.
Create your feature branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Create a new Pull Request.