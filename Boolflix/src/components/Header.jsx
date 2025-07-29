import { useState, useEffect } from 'react'
import.meta.env.VITE_API_KEY
import "flag-icons/css/flag-icons.min.css";


export default function Header(){

    console.log('Header mounted 🏗️');
    
    const apiKey = import.meta.env.VITE_API_KEY;
    const [ results, setResults ] = useState(null);
    const [ query, setQuery ] = useState('');
    
    
    // User query check
    if (query === ''){
        console.log('Waiting for a query...');
    } else{
        console.log('Query: ' + query);
    }
    
    // Flag converter
    function flagConverter(info, flag) {
        
        // Language check
        let language = info.original_language;

        if (!info.original_language) {
            language = 'err'
        }

        // Assignment of 'language' 
        // https://flagicons.lipis.dev/ <-- credits

        if (language != 'err') {
            return flag = 'fi fi-' + language;
        } else {
            return flag = "fa-solid fa-xmark";
        }
    }
    

    // Film research
    function fetchSearch(e){
        e.preventDefault();

        // Fetch film
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => {

            // Api results
            const info = data.results[0];
            let flag = '';

            // Returns value to put in <x className=>
            const flagConverted = flagConverter(info, flag);
            
            // New object for easier data managment
            const filmInfos = {
                'film_title': info.title,
                'original_title': info.original_title,
                'flag': `className=${flagConverted}`, 
                'vote_average': info.vote_average,
                'vote_count': info.vote_count
            }

            // Set new object as state
            setResults(filmInfos);
        });  

        // Fetch Tv-Shows
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`)
        .then(res => res.json())
        .then(data => {

            // Api results
            const info = data.results[0];
            let flag = '';

            // Returns value to put in <x className=>
            const flagConverted = flagConverter(info, flag);
            
            // New object for easier data managment
            const tvShowsInfos = {
                'tvShow_title': info.name,
                'original_title': info.name,
                'flag': `className=${flagConverted}`, 
                'vote_average': info.vote_average,
                'vote_count': info.vote_count
            }

            // Set new object as state
            setResults(tvShowsInfos);
        });  
        
        // State checker
        if(results != null){
            console.log(results);
        }
    };
    
    useEffect(()=>{}, []);

    return (
        <header>
            <nav className="navbar navbar-expand-lg  bg-dark sticky-top p-2">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    
                    <h1 className="text-danger m-0">BOOLFLIX</h1>

                    <form onSubmit={fetchSearch} role="search" className="d-flex justify-content-center align-items-center">
                        <input onChange={e => {setQuery(e.target.value)}} type="search" placeholder='Title name' className="form-control me-2" />
                        <button className="btn btn-danger">Search</button>
                    </form>
                
                </div>
            </nav>
        </header>
    )
}