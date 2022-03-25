import React, { useEffect, useState } from "react";
import { Api } from "../Api";
import { useHistory } from "react-router-dom";

export default () => {
    

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");

    const [errors, setErrors] = useState([]);

    let history = useHistory();

    let addBook = async () => {
        let api = new Api();
        try {
            let book = {};
            book.title = title;
            book.author = author;
            book.genre = genre;
            book.year = year;
            let response = await api.addBook(book);

        } catch (e) {
            
            throw new Error(e);

        }    

    }


    let valid = () => {
        

        setErrors([]);

        if (title === "") {
            
            setErrors(prev =>(
                 
                [
                    ...prev,
                    "Title is required"
                ])
            )
        }

        if (author === "") {
            
            setErrors(prev =>( 
                
                [...prev,
                    "Author is required"
                ])
            )
            
        }

        if (genre === "") {
            
            setErrors(prev => (
                
                [...prev,
                    "Genre is required"
                ])
            )
            
        }


    
        const regex = /\d*/g;
        console.log("test " + regex.test(year));
        if (regex.test(year)==false) {
            setErrors(prev => (
                [
                    ...prev,
                    "Year must be number"
                ]
            ))
        } 
        
        if (year < 1500 || year > 2022) {
            
            setErrors(prev => (
                
                [...prev,
                    "Year must be between 1500-2022"
                ]   
            ))
            
        }
    


    }



    useEffect(() => {
        
        valid();


    }, [title,author,genre,year])
    
    
    let handleChange = (e) => {
        
        let obj = e.target;

        if(obj.classList.contains("title")){
            setTitle(obj.value);
        }
        if (obj.classList.contains("author")) {
            setAuthor(obj.value);
        }
        if (obj.classList.contains("genre")) {
            setGenre(obj.value);
        }
        if (obj.classList.contains("year")) {
            setYear(obj.value);
        }

        
    }

    let handleSubmit = (e) => {

        valid();
        if (errors.length == 0) {
            addBook();
            
            history.push("/");        
        }else{

            let text = "";

            errors.forEach(e => {
                text += e + "\n";
            })

            alert(text);
        }
    
    }

    let handleCancel = () => {
        
        history.push("/");
    }

    return (
        <form   id="frmnewbook" onChange={handleChange} >
            <h1>New Book</h1>
            <div id="err"></div>
            <div class="divnewb">
                <label>Title</label>
                <input type="text" name="title" id="title" className="title" />
    
            </div>
            <div class="divnewb">
                <label>Author</label>
                <input type="text" name="auth" id="auth" className="author"/>

            </div>
            <div class="divnewb">
                <label>Genre</label>
                <input type="text" name="gen" id="gen" className="genre"/>

            </div>

            <div class="divnewb">
                <label>Year</label>
                <input type="text" name="year" id="year" className="year"/>

            </div>
            <button className="buton unu" id="btn_nb_submit"  onClick={handleSubmit}>Create New Book</button>
            <button className="buton doi" id="btn_nb_cancel" onClick={handleCancel}>Cancel</button>
        </form>        
        
    )
}