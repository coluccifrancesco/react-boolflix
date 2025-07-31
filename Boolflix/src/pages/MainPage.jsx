import {useState, useEffect} from 'react'


export default function MainPage() {

    const apiKey = import.meta.env.VITE_API_KEY;
    const [film, setFilm] = useState(null);
    const [tv, setTv] = useState(null);
    const [query, setQuery] = useState('');
    const [isHoveredId, setIsHoveredId] = useState(null);
    
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


    // Flag converter
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

    // Stars giver
    function starsRating(vote){
        
        let starNumber = Math.ceil(vote / 2);

        if (starNumber == 0){
            return 'No rating yet 😯'
        } else if (starNumber == 1){
            return '⭐️'
        } else if (starNumber == 2){
            return '⭐️⭐️'
        } else if (starNumber == 3){
            return '⭐️⭐️⭐️'
        } else if (starNumber == 4){
            return '⭐️⭐️⭐️⭐️'
        } else if (starNumber == 5){
            return '⭐️⭐️⭐️⭐️⭐️'
        } 
    }

    // Overview cheker
    function overCheck(overview){
        if(overview === ""){
            return 'No description yet 😕'
        } else {    
            return overview
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

                // Flags logic
                const lang = item.original_language;
                const flag = findFlag(lang);

                // Img link
                const img = 'https://image.tmdb.org/t/p/w342' + item.poster_path;

                // Vote
                const vote = item.vote_average;
                const stars = starsRating(vote);

                // Overview
                const overview = item.overview;
                const desc = overCheck(overview);
                
                return item = {
                    'title': item.title,
                    'original_title': item.original_title,
                    'original_language': flag,
                    'average_vote': stars,
                    'img': img,
                    'id': item.id,
                    'desc': desc
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

                // Flags logic
                const lang = item.original_language;
                const flag = findFlag(lang);

                // Img link
                const img = 'https://image.tmdb.org/t/p/w342' + item.poster_path;

                // Vote
                const vote = item.vote_average;
                const stars = starsRating(vote);

                // Overview
                const overview = item.overview;
                const desc = overCheck(overview);

                return item = {
                    'name': item.name ,
                    'original_name': item.original_name,
                    'original_language': flag,
                    'average_vote': stars,
                    'img': img,
                    'id': item.id,
                    'desc': desc
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


            <main className="bg-dark-subtle p-5">

                <div>

                    {/* Film display */}
                    <section className='container'>
                        <div className='my-4'>
                            {film ? <h2>Film</h2> : <span></span>}
                        </div>
                        
                        <ul className='row list-unstyled g-4'>

                            {/* // Se film ha un risultato, allora si effettua il map, altrimenti lascio uni spazio vuoto */}
                            {film ? film.map((item) => {
                                return <li className='col col-12 col-sm-6 col-md-4 col-lg-3' key={item.id}>

                                    {item ? <div className='card h-100 shadow-sm border-0 overflow-hidden position-relative'
                                        style={{ 
                                            transition:'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        
                                        // Utilizzo una vriabile di stato a cui associare lo stato di hover 
                                        onMouseEnter={() => setIsHoveredId(item.id)}
                                        onMouseLeave={() => setIsHoveredId(null)} >
                                        
                                        {/* Se non sono in hover mostro la locandina, altrimenti mostro le informazioni */}
                                        {isHoveredId != item.id ? <img src={item.img} className='card-img-top' alt='Preview not available'/>
                                        
                                        :

                                        <div className='d-block'>
                                            <img src={item.img} className='card-img-top opacity-25 object-fit-cover"' alt='Preview not available'style={{position:'absolute'}}/>
                                            
                                            <div className='container bg-body-dark my-4' style={{position:'absolute'}}>
                                                <h3 className='card-title fw-bold mb-2 lh-sm'><b>Title:</b> {item.title}</h3>
                                                <h5 className="text-black-50 fst-italic mb-3 small"><b>Original title:</b> {item.original_title}</h5>
                                                <p><b>Vote:</b> {item.average_vote}</p>
                                                <p className="card-text small lh-sm mb-0"><b>Overview:</b> <span style={{fontSize:10, overflow:'hidden'}}>{item.desc}</span></p>
                                            </div>
                                        </div>
                                        }
                                    
                                    </div> : <span></span>}

                                </li>
                                }
                            
                            ) : <h2 className="text-muted text-center mb-3">🔍 Make a research!</h2>}

                        </ul>   
                    </section>

                    
                    {/* Tv Show display */}
                    <section className='container'>
                        <div className='my-4'>
                            {tv ? <h2>Tv Shows</h2> : <span></span>}
                        </div>
                        
                        <ul className='row list-unstyled g-4'>

                            {tv ? tv.map((item) => {
                                return <li className='col col-12 col-sm-6 col-md-4 col-lg-3' key={item.id}>

                                    {item ? <div className='card h-100 shadow-sm border-0 overflow-hidden position-relative'
                                        style={{ 
                                            transition:'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        
                                        // Utilizzo una vriabile di stato a cui associare lo stato di hover 
                                        onMouseEnter={() => setIsHoveredId(item.id)}
                                        onMouseLeave={() => setIsHoveredId(null)} >
                                        
                                        {/* Se non sono in hover mostro la locandina, altrimenti mostro le informazioni */}
                                        {isHoveredId != item.id ? <img src={item.img} className='card-img-top' alt='Preview not available'/>
                                        
                                        :

                                        <div className='d-block'>
                                            <img src={item.img} className='card-img-top opacity-25 object-fit-cover"' alt='Preview not available'style={{position:'absolute'}}/>
                                            
                                            <div className='container bg-body-dark my-4' style={{position:'absolute'}}>
                                                <h3 className='card-title fw-bold mb-2 lh-sm'><b>Title:</b> {item.name}</h3>
                                                <h5 className="text-black-50 fst-italic mb-3 small"><b>Original title:</b> {item.original_name}</h5>
                                                <p><b>Vote:</b> {item.average_vote}</p>
                                                <p className="card-text small lh-sm mb-0"><b>Overview:</b> <span style={{fontSize:10, overflow:'hidden'}}>{item.desc}</span></p>
                                            </div>
                                        </div>
                                        }
                                    
                                    </div> : <span></span>}

                                </li>
                                }
                            
                            ) : <span></span>}

                        </ul>   
                    </section>

                </div>

            </main>
        </>
    )
}