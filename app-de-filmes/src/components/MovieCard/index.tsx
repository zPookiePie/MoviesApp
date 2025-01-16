import Movie from "@/types/movie"
import RatingStar from "../RatingStar";

import './index.scss'

export interface Props {
    movie: Movie
}

function MovieCard(props: Props) {
    
    const movie = props.movie;

    return (
        <li className="movie-card">
            <div className="poster-movie">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="movie-infos">
                <p className="movie-title">
                    {movie.title}
                </p>
                {movie.vote_average > 0 &&
                    <RatingStar
                    rating={movie.vote_average}
                />
                }
                <div className="hidden-content">
                    {movie.overview && 
                        <p className="movie-description">
                        {movie.overview.length > 100
                        ? `${movie.overview.substring(0, 100)}...`
                        : movie.overview
                        }
                    </p>
                    }

                    <button className="btn">Veja mais</button>

                </div>
            </div>
        </li>
    )
}

export default MovieCard
