#!/bin/bash

CONTAINER_ID=$(sudo docker ps | grep 5432 | awk 'NR==1' | awk '{print $1}')
sudo docker exec -it "$CONTAINER_ID" psql -U postgres postgres <<EOF
-- Create database and tables
\c library
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    available_quantity INTEGER NOT NULL,
    shelf_location VARCHAR(50)
);
CREATE TABLE borrowers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    registered_date DATE NOT NULL
);
CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    borrower_id INTEGER REFERENCES borrowers(id),
    borrow_date DATE NOT NULL,
    return_date DATE,
    returned BOOLEAN DEFAULT FALSE,
    actual_return_date DATE
);
CREATE INDEX ON books(title);
CREATE INDEX ON books(author);
CREATE INDEX ON books(isbn);
EOF
echo "PostgreSQL installation and database setup completed."
