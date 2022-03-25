import React, { useEffect, useState } from "react";
import { Api } from "../Api";


import { useHistory } from "react-router-dom";


import { Link } from "react-router-dom";

export default () => {


    let x = 7;

    // let [y, setY] = useState(0);

    // let handleClick=()=>{

    //     setY(prev => prev + 1);
    //     console.log(x);

    // }

    let [z, setZ] = useState(7);
    
    
    let [books, setBooks] = useState([]);


    let history = useHistory();

    let fetchBooks = async () => {
        let api = new Api();
        try {
            let data = await api.getBooks();
            setBooks(data);
        } catch (e) {
            throw new Error(e);
        }
    }



    let handleClick = () => {
       
        history.push("/new");
    }

    let handleRowClick = (id) => {
       // console.log("id ="+id);
        history.push("/update/" + id);        
    }

    useEffect(() => {
        
        console.log("aici");
        fetchBooks();


    },[])
    

    return  ( <main>
        <h1>Books{z}</h1>
        <button id="btn_create" onClick={handleClick}>Create New Book</button>
        <div id="lib">
        <table>
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Year</th>
                </tr>
            </thead>
                {
             
                    books 
                       ? books.map(book =>
                           <tr onClick={() => { handleRowClick(book.id); }}>
                               <th><Link to={"/update/" + book.id}>{book.title}</Link></th>
                               <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.year}</td>
                            </tr>)
                
                       : <p>Loading....</p>
                }
            

        </table>

    </div>

    </main>)
}