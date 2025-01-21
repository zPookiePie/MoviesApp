'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

import { RxReset } from 'react-icons/rx';
import RatingStar from '@/components/RatingStar';

import './index.scss';

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

function MovieDetailsPage() {
    const { id: movieId } = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof movieId === 'string') {
        fetchMovieDetails(movieId);
        }
    }, [movieId]);

    const fetchMovieDetails = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
            api_key: 'd28bd824e1883bb5ec5719a53b274949',
            language: 'pt-BR',
            },
        });
        setMovie(res.data);
        } catch (err) {
        console.error('Erro ao buscar os detalhes do filme:', err);
        setError('Erro ao carregar os detalhes do filme.');
        } finally {
        setLoading(false);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return (
        <div className="movie-details">
            <h1>{error}</h1>
            <button onClick={() => window.history.back()} className="reset">
            <RxReset /> Voltar
            </button>
        </div>
        );
    }

    if (!movie) {
        return (
        <div className="movie-details">
            <p>Selecione um filme para ver os detalhes.</p>
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
            <button onClick={() => window.history.back()} className="reset">
                <RxReset /> Voltar
            </button>
            </div>
        </main>
        </div>
    );
    }

    export default MovieDetailsPage;
