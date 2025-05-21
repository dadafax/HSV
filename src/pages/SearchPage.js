import React from "react";
import NavBar from "../NavBar";

const SearchPage = () => {
    return (
        <div>
            <NavBar/>
        <div className="search-container">
            <input
                type="search"
                id="site-search"
                name="q"
                className="search-input"
                placeholder="Search the site..."
            />
            <button type="button" className="search-button">Search</button>
        </div>
        </div>
    )
}

export default SearchPage;