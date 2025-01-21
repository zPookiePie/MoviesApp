import Link from 'next/link';
import { Metadata } from 'next';
import axios from 'axios';

import './index.scss';
import RatingStar from '@/components/RatingStar';
import { RxReset } from 'react-icons/rx';

interface MovieDetails {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    genres: { id: number; name: string }[];
}

export async function generateMetadata({
    params,
  }: {
    params: { id: string };
  }): Promise<Metadata> {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}`,
      {
        params: {
          api_key: 'd28bd824e1883bb5ec5719a53b274949',
          language: 'pt-BR',
        },
      }
    );
        const movie = res.data;
        return { title: movie.title };
}

//buscar os detalhes do filme
async function getMovieDetails(id: string) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: 'd28bd824e1883bb5ec5719a53b274949',
        language: 'pt-BR',
      },
    });
    return res.data;
  }

// página para exibir os detalhes do filme
export default async function MovieDetailsPage({ params, }: { params: { id: string } }) {

    const movie: MovieDetails = await getMovieDetails(params.id);

    return (
        <div className="movie-details">
        <div
            className="background-overlay"
            style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
            }}
        ></div>
        <main>
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            />
            <div>
            <span>
                <h1>{movie.title}</h1>
            </span>
            {movie.vote_average > 0 && <RatingStar rating={movie.vote_average} />}
            <p>Sinopse: {movie.overview}</p>
            <p>Data de lançamento: {movie.release_date}</p>
            <ul>
                {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <Link href="/" className="reset">
                <RxReset /> Voltar
            </Link>
            </div>
        </main>
        </div>
    );
}