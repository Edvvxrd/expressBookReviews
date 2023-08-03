const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    const doesExist = (username) => {
        let userswithsamename = users.filter((user) => {
            return user.username === username
        });
        if (userswithsamename.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    if (!username && !password) {
        return res.status(404).json({ message: "Username and Password is missing" });
    } else if (!username) {
        return res.status(404).json({ message: "Username is missing." });
    } else if (!password) {
        return res.status(404).json({ message: "Password is missing." });
    } else {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
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

    if (book != null) {
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

    if (works.booksbyauthor.length > 0) {
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

    if (works.booksbytitle.length > 0) {
        return res.status(200).json(works);
    } else {
        return res.status(404).json({ message: "No item found!" });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    let book = null;

    Object.keys(books).forEach(key => {
        if (key == isbn) {
            book = books[key].reviews;
        }
    });

    if (book != null) {
        return res.status(200).json(book);
    } else {
        return res.status(404).json({ message: "No item found!" });
    }
});

module.exports.general = public_users;
