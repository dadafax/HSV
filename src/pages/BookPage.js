import React from "react";
import NavBar from "../NavBar";

const BookPage = () => {
    return (
        <div>
            <NavBar/>
            <p>Réserver votre place ici.</p>
            <select name="rdv" id="rdv-select">
                <option value="">--Please choose an option--</option>
                <option value="Cardiologie">Cardiologue</option>
                <option value="Pneumologie">Pneumoligue</option>
                <option value="Neurologie">Neurologue</option>
                <option value="Dermatologie">Dermatologue</option>
                <option value="Rhumatologie">Rhumatologue</option>
                <option value="Nephrologie">Néphrologue</option>
            </select>
        </div>
    );
}

export default BookPage;