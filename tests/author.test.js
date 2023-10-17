const mongoose = require('mongoose');
const Author = require('../models/author');

describe('Author Model Unit Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://joaopsusano:1d6rqSA1wxEOATMl@cluster0.ajvnvqi.mongodb.net/local_library?retryWrites=true&w=majority&appName=AtlasApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {

    await mongoose.connection.close();
  });

  it('should create a new author', async () => {
    const authorData = {
      first_name: 'John',
      family_name: 'Doe',
      date_of_birth: new Date('1990-01-01'),
      date_of_death: new Date('2021-01-01'),

    };

    const author = new Author(authorData);
    const savedAuthor = await author.save();

    expect(savedAuthor._id).toBeDefined();
    expect(savedAuthor.first_name).toBe(authorData.first_name);
    expect(savedAuthor.family_name).toBe(authorData.family_name);
  });

  it('should not create an author without required fields', async () => {
    const authorData = {
      first_name: '',
      family_name: '',
      date_of_birth: '',
    };

    const author = new Author(authorData);

    let error;
    try {
      await author.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should correctly format date_of_birth and date_of_death using Luxon', () => {
    const author = new Author({
      date_of_birth: new Date('1990-01-01'),
      date_of_death: new Date('2021-01-01'),
    });

    expect(author.date_of_birth_formatted).toMatch('1 Jan 1990');
    expect(author.date_of_death_formatted).toMatch('1 Jan 2021');
  });
});
