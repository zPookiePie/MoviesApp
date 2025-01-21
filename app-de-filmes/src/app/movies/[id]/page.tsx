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

//gerar metadata dinamicamente com base no filme
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        params: {
            api_key: 'd28bd824e1883bb5ec5719a53b274949',
            language: 'pt-BR',
        },
        });
        const movie = res.data;
        return { title: movie.title };
    } catch (error) {
        console.error('Erro ao buscar metadata:', error);
        return { title: 'Filme não encontrado' };
    }
}

//buscar os detalhes do filme
async function getMovieDetails(id: string): Promise<MovieDetails> {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
            api_key: 'd28bd824e1883bb5ec5719a53b274949',
            language: 'pt-BR',
        },
        });
        return res.data;
    } catch (error) {
        console.error('Erro ao buscar os detalhes do filme:', error);
        throw new Error('Erro ao buscar os detalhes do filme.');
    }
}

// página para exibir os detalhes do filme
export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
    let movie: MovieDetails;

    try {
        movie = await getMovieDetails(params.id);
    } catch (error) {
        return (
        <div className="movie-details">
            <h1>Erro ao carregar os detalhes do filme.</h1>
            <Link href="/" className="reset">
            <RxReset /> Voltar
            </Link>
        </div>
        );
}

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