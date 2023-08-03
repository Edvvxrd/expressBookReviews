const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    return res.status(200).send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    let book = null;

    Object.keys(books).forEach(key => {
        if (key == isbn) {
            book = books[key];
        }
    });
    
    if(book != null) {
        return res.status(200).json(book);
    } else {
        return res.status(404).json({ message: "No item found!" });
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author;
    let works = { "booksbyauthor": [] };

    Object.keys(books).forEach(key => {
        if (books[key].author == author) {
            works.booksbyauthor.push({
                "isbn": key,
                "title": books[key].title,
                "reviews": books[key].reviews
            });
        }
    });
    
    if(works.booksbyauthor.length > 0) {
        return res.status(200).json(works);
    } else {
        return res.status(404).json({ message: "No item found!" });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const title = req.params.title;
    let works = { "booksbytitle": [] };

    Object.keys(books).forEach(key => {
        if (books[key].title == title) {
            works.booksbytitle.push({
                "isbn": key,
                "author": books[key].author,
                "reviews": books[key].reviews
            });
        }
    });
    
    if(works.booksbytitle.length > 0) {
        return res.status(200).json(works);
    } else {
        return res.status(404).json({ message: "No item found!" });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
