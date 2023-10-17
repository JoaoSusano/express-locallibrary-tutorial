const mongoose = require('mongoose');
const BookInstance = require('../models/bookinstance');

describe('BookInstance Model Unit Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://joaopsusano:1d6rqSA1wxEOATMl@cluster0.ajvnvqi.mongodb.net/local_library?retryWrites=true&w=majority&appName=AtlasApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new book instance', async () => {
    const bookInstanceData = {
      book: new mongoose.Types.ObjectId(),
      imprint: 'Publisher Name',
      status: 'Available',
      due_back: new Date('2023-12-31'),
    };

    const bookInstance = new BookInstance(bookInstanceData);
    const savedBookInstance = await bookInstance.save();

    expect(savedBookInstance._id).toBeDefined();
    expect(savedBookInstance.book).toEqual(bookInstanceData.book);
    expect(savedBookInstance.imprint).toBe(bookInstanceData.imprint);
    expect(savedBookInstance.status).toBe(bookInstanceData.status);
    expect(savedBookInstance.due_back).toEqual(bookInstanceData.due_back);
  });

  it('should not create a book instance without required fields', async () => {
    const bookInstanceData = {
        book:'',
        imprint: '',
        status:'',
        due_back: '',
    }; 

    const bookInstance = new BookInstance(bookInstanceData);

    let error;
    try {
      await bookInstance.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors).toBeDefined();
  });
});
