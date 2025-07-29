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
            
            setResults(
                data.results[0]
            )
            
            console.log(
                'Title: ' + results.title + ', ' +
                'Original title: ' + results.original_title + ', ' +
                'Language: ' + results.original_language + ', ' +
                'Average vote: ' + results.vote_average + ', ' +
                'Vote count: ' + results.vote_count
            );  
        
        })  
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