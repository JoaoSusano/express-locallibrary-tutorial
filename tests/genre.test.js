const mongoose = require('mongoose');
const Genre = require('../models/genre');

describe('Genre Model Unit Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://joaopsusano:1d6rqSA1wxEOATMl@cluster0.ajvnvqi.mongodb.net/local_library?retryWrites=true&w=majority&appName=AtlasApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new genre', async () => {
    const genreData = {
      name: 'Genre',
    };

    const genre = new Genre(genreData);
    const savedGenre = await genre.save();

    expect(savedGenre._id).toBeDefined();
    expect(savedGenre.name).toBe(genreData.name);
  });

  it('should not create a genre without a valid name', async () => {
    const genreData = {
        name: 'FM', //Name cannot have less than 3 letters
    }; 

    const genre = new Genre(genreData);

    let error;
    try {
      await genre.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name).toBeDefined();
  });

});
