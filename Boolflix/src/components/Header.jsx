

export default function Header(){
    return (
        <nav className="navbar navbar-expand-lg bg-dark fixed-top">
            <div className="container-fluid">
                <h1 className="text-danger">BOOLFLIX</h1>

                <form role="search" className="d-flex justify-content-center align-items-center">
                    <input type="search" placeholder="Title name" className="form-control me-2" />
                    <button className="btn btn-danger">Search</button>
                </form>
            </div>
        </nav>
    )
}