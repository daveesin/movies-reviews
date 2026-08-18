function Navbar() {
    return(
        <div className="flex justify-between items-center gap-3 p-6 w-full h-full max-h-60 shadow bg-movies-card text-movies-text">

            <div>
                <span>Logo</span>
            </div>

            <div>
                <span>List</span>
            </div>

            <div>
                <span>Login/Settings (?)</span>
            </div>

        </div>
    );
}

export default Navbar;