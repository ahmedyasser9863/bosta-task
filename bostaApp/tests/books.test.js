const BookModel = require('../models/books');
const db = require('../db');

jest.mock('../db');

describe('Book Model', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Create a new book', async () => {
        // Mock data
        const bookData = {
            title: 'Test Book',
            author: 'Test Author',
            isbn: '12345',
            available_quantity: 2,
            shelf_location: 'Test Shelf'
        };

        // Mock database query result
        db.query.mockResolvedValue({ rows: [bookData] });

        // Call create method
        var _, newBook = await BookModel.create(bookData);
        console.log(newBook)

        // Assertions
        expect(newBook).toEqual(bookData);
        expect(db.query).toHaveBeenCalled();
    });

});
