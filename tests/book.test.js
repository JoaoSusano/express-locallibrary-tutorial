const mongoose = require('mongoose');
const Author = require("../models/author");
const Genre = require('../models/genre');
const Book = require('../models/book'); 

describe('Book Model Unit Tests', () => {
  beforeAll(async () => {
 
    await mongoose.connect('mongodb+srv://joaopsusano:1d6rqSA1wxEOATMl@cluster0.ajvnvqi.mongodb.net/local_library?retryWrites=true&w=majority&appName=AtlasApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {

    await mongoose.connection.close();
  });

  it('should create a new book', async () => {
    const authorData = {
      first_name: 'John',
      family_name: 'Doe',
    };
    const author = new Author(authorData);
    await author.save();

    const genreData = {
      name: 'Fiction',
    };
    const genre = new Genre(genreData);
    await genre.save();

    const bookData = {
      title: 'Sample Book',
      author: author._id,
      summary: 'A sample book summary',
      isbn: '1234567890',
      genre: [genre._id],
    };

    const book = new Book(bookData);
    const savedBook = await book.save();

    expect(savedBook._id).toBeDefined();
    expect(savedBook.title).toBe(bookData.title);
    expect(savedBook.author.toString()).toBe(bookData.author.toString());
    expect(savedBook.summary).toBe(bookData.summary);
    expect(savedBook.isbn).toBe(bookData.isbn);
    expect(savedBook.genre.map((g) => g.toString())).toEqual(
      bookData.genre.map((g) => g.toString())
    );
  });

  it('should not create a book without required fields', async () => {
    const bookData = {
        title: ' ',
        author: '',
        summary: '',
        isbn: ' ',
        genre: '',
    }; 

    const book = new Book(bookData);

    let error;
    try {
      await book.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
