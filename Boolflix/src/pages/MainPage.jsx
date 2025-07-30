import {useState, useEffect} from 'react'


export default function MainPage() {


    const apiKey = import.meta.env.VITE_API_KEY;
    const [film, setFilm] = useState(null);
    const [tv, setTv] = useState(null);
    const [query, setQuery] = useState('');
    
    const flags = [
        { us: '🇺🇸' },
        { cn: '🇨🇳' },
        { gb: '🇬🇧' },
        { de: '🇩🇪' },
        { jp: '🇯🇵' },
        { fr: '🇫🇷' },
        { it: '🇮🇹' },
        { br: '🇧🇷' },
        { ca: '🇨🇦' },
        { es: '🇪🇸' }
    ];


    // User query check
    if (query === '') {
        console.log('Waiting for a query...');
    } else {
        console.log('Query: ' + query);
    }


    // Flag converter, credits --> https://flagicons.lipis.dev/
    function findFlag(lang) {

        // originalLanguage
        let oL = lang;

        if (!oL) {
            oL = 'err'
        }

        // Assignment of 'language' 
        if (oL != 'err') {
            return 'fi fi-' + oL;
        } else {
            return "fa-solid fa-xmark";
        }
    }


    // Search
    function fetchSearch(e) {
        e.preventDefault();

        // Fetch film
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => {

            // Api results
            const film = data.results;

            const filmObj = film.map((item) => {

                const lang = item.original_language;
                const flag = findFlag(lang);

                return item = {
                    'Title': item.title ,
                    'Original title': item.original_title,
                    'Original language': flag,
                    'Average vote': item.vote_average
                }
            })

            console.log(filmObj);

            // Set new object as state
            setFilm(filmObj);
        });

        // Fetch Tv-Shows
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`)
            .then(res => res.json())
            .then(data => {

            // Api results
            const tv = data.results;

            const tvObj = tv.map((item) => {

                const lang = item.original_language;
                const flag = findFlag(lang);

                return item = {
                    'Name': item.name ,
                    'Original name': item.original_name,
                    'Original language': flag,
                    'Average vote': item.vote_average
                }
            })

            console.log(tvObj);

            // Set new object as state
            setTv(tvObj);
        });
    };


    
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg  bg-dark sticky-top p-2">
                    <div className="container-fluid d-flex justify-content-between align-items-center">

                        <h1 className="text-danger m-0">BOOLFLIX</h1>

                        <form onSubmit={fetchSearch} role="search" className="d-flex justify-content-center align-items-center">
                            <input onChange={e => { setQuery(e.target.value) }} type="search" placeholder='Title name' className="form-control me-2" />
                            <button className="btn btn-danger">Search</button>
                        </form>

                    </div>
                </nav>
            </header>

            <main className="bg-dark-subtle">

                <div className="container d-flex justify-content-center align-items-center">
                    <h1>Home</h1>
                </div>

            </main>
        </>
    )
}