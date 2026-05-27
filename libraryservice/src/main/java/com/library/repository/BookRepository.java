package com.library.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.library.entity.Book;



public interface BookRepository extends JpaRepository<Book, Integer> {

    List<Book> findByAuthor(String author);

    Optional<Book> findByTitle(String title);

    List<Book> findByGenre(String genre);

    @Query("FROM Book WHERE price BETWEEN :min AND :max")
    List<Book> findByPriceRange(@Param("min") double priceMin,
                                @Param("max") double priceMax);
}
