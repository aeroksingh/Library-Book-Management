package com.library.controller;

import java.util.List;
import com.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.library.entity.Book;


@RestController
@RequestMapping("/api/v1/books")
public class BookRestController {

    @Autowired
    private BookService service;

    @PostMapping(value = "/add")
    public ResponseEntity<Book> save(@RequestBody Book book) {
        Book savedBook = service.save(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{isbn}")
    public ResponseEntity<Book> findByIsbn(@PathVariable int isbn) {
        Book book = service.findByIsbn(isbn);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping(value = "/author/{author}")
    public ResponseEntity<List<Book>> findByAuthor(@PathVariable String author) {
        List<Book> books = service.findByAuthor(author);
        if(books.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(books, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/title/{title}")
    public ResponseEntity<Book> findByTitle(@PathVariable String title) {
        Book book = service.findByTitle(title);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping(value = "/genre/{genre}")
    public ResponseEntity<List<Book>> findByGenre(@PathVariable String genre) {
        List<Book> books = service.findByGenre(genre);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Book>> findAll() {
        List<Book> books = service.findAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping(value = "/price")
    public ResponseEntity<List<Book>> findByPriceRange(@RequestParam double min, @RequestParam double max) {
        List<Book> books = service.findByPriceRange(min, max);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<String> deleteByIsbn(@PathVariable int isbn) {
        if(service.deleteByIsbn(isbn))
            return new ResponseEntity<>("Book deleted", HttpStatus.OK);
        else
            return new ResponseEntity<>("Book not found",  HttpStatus.NOT_FOUND);
    }
}
