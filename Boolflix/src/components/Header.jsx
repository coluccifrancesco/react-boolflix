import { useState, useEffect } from 'react'
import.meta.env.VITE_API_KEY


export default function Header(){

    console.log('Header mounted 🏗️');
    
    const apiKey = import.meta.env.VITE_API_KEY;
    const [ results, setResults ] = useState(null);
    const [ query, setQuery ] = useState('');
    

    if (query === ''){
        console.log('Waiting for a query...');
    } else{
        console.log('Query: ' + query);
    }

    
    function fetchSearch(e){
        e.preventDefault();
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => {

            const x = data.results[0];

            const filmInfos = {
                'film_title': x.title,
                'original_title': x.original_title,
                'original_language': x.original_language,
                'vote_average': x.vote_average,
                'vote_count': x.vote_count
            }

            setResults(filmInfos);
        });  
        
    };
    
    useEffect(()=>{}, []);
    
    console.log(results);


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