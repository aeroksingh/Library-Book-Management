package com.library.service;

import java.util.List;

import com.library.entity.Book;



public interface BookService {
	Book save(Book book);

    Book findByIsbn(int isbn);

    List<Book> findAll();

    boolean deleteByIsbn(int isbn);

    List<Book> findByAuthor(String author);

    Book findByTitle(String title);

    List<Book> findByGenre(String genre);

    List<Book> findByPriceRange(double priceMin, double priceMax);
}
