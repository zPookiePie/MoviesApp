'use client';

import { useEffect, useState } from 'react'
import axios from 'axios';

import { FaSearch } from "react-icons/fa";
import { RxReset } from "react-icons/rx";

import  './index.scss'
import Movie from '@/types/movie';
import MovieCard from '../MovieCard';

export interface MovieType {
    id: number,
    title: string,
    poster_path: string,
    overview: string,
    vote_average: number,
}


function MovieList () {

    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    
    useEffect(() => {
        if (!isSearching) getMovies(page)
    }, [page, isSearching])
    
    const getMovies = (pageNumber: number) => {
        setLoading(true)
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'd28bd824e1883bb5ec5719a53b274949',
                language: 'pt-BR',
                page: pageNumber,
            }
            })
            .then((resp) => {
                setMovies((prevMovies) => [...prevMovies, ...resp.data.results]);
            })
            .catch((error) => {
                console.error('Erro ao buscar os filmes:', error);
            })
            .finally(() => {
                setLoading(false);
            })
        }


// função para buscar filmes pelo nome
    const searchMovies = () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setIsSearching(true);
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {
                api_key: 'd28bd824e1883bb5ec5719a53b274949',
                language: 'pt-BR',
                query: searchQuery,
            },
        })
        .then((resp) => {
            setMovies(resp.data.results);
        })
        .catch((error) => {
            console.error('Erro ao buscar os filmes:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const resetSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
        setMovies([]);
        setPage(1);
    };


    const loadMoreMovies = () => {
        if (!isSearching) {
            setPage((prevPage) => prevPage + 1);
        }
    }

    return (
        <>

            <div className="discovery">
                {isSearching ? (
                    <button className="reset" onClick={resetSearch} disabled={loading}>
                        <RxReset/> Voltar
                    </button> ) : (
                <div className="placeholder"></div> )}

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Pesquisar filmes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search" onClick={searchMovies} disabled={
                    loading || !searchQuery.trim()}>
                    <FaSearch />
                    </button> 
                </div>
            </div>


            <ul className="movie-list">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p className="movie-not-found">Nenhum filme encontrado.</p>
                )}
            </ul>


            {isSearching ? (
                    <div className="placeholder"></div>) : (
                        <button 
                        className="load-more-button" 
                        onClick={loadMoreMovies} 
                        disabled={loading}
                    >
                    {loading ? 
                        'Carregando...' : 'Carregar mais filmes'}
                    </button>
            )}
        </>
    )
}

export default MovieList