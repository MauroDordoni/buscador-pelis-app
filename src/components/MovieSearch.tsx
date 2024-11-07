import { useState, useEffect } from 'react';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
}

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm === '') return;

    const fetchMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
          setError(null);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch (err) {
        setMovies([]);
        setError("Error fetching movies");
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <input
        type="text"
        placeholder="Busca una película"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="p-4 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} className="w-full h-60 object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
