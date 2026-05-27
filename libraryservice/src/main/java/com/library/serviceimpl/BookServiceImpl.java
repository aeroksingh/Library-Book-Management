package com.library.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.entity.Book;
import com.library.exception.InvalidBookException;
import com.library.repository.BookRepository;
import com.library.service.BookService;


@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository repo;

    @Override
    public Book save(Book book) {
        return repo.save(book);
    }

    @Override
    public Book findByIsbn(int isbn) {
        return repo.findById(isbn).orElseThrow(
                () -> new InvalidBookException("Book with ISBN " + isbn + " not found"));
    }

    @Override
    public List<Book> findAll() {
        return repo.findAll();
    }

    @Override
    public boolean deleteByIsbn(int isbn) {
        repo.deleteById(isbn);
        return true;
    }

    @Override
    public List<Book> findByAuthor(String author) {
        return repo.findByAuthor(author);
    }

    @Override
    public Book findByTitle(String title) {
        return repo.findByTitle(title).orElseThrow(
                () -> new InvalidBookException("Book with title " + title + " not found")
        );
    }

    @Override
    public List<Book> findByGenre(String genre) {
        return repo.findByGenre(genre);
    }

    @Override
    public List<Book> findByPriceRange(double priceMin, double priceMax) {
        return repo.findByPriceRange(priceMin, priceMax);
    }
}
