package com.library.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
public class Book {
    @Id
    private int isbn;
    @Column(length = 30)
    private String title;
    @Column(length = 30)
    private String author;
    @Column(length = 15)
    private String genre;
    private double price;
    
	public int getIsbn() {
		return isbn;
	}
	public void setIsbn(int isbn) {
		this.isbn = isbn;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	public Book() {
	}
	public Book(int isbn, String title, String author, String genre, double price) {
		this.isbn = isbn;
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.price = price;
	}
	
}
