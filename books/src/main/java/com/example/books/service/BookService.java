package com.example.books.service;

import com.example.books.dto.BookUpdateDTO;
import com.example.books.model.Book;
import com.example.books.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return repository.findById(id);
    }

    public Book createBook(Book book) {
        return repository.save(book);
    }

    public Book updateBook(Long id, BookUpdateDTO dto) {
        return repository.findById(id).map(book -> {
            if (dto.getTitle() != null) book.setTitle(dto.getTitle());
            if (dto.getAuthor() != null) book.setAuthor(dto.getAuthor());
            if (dto.getYear() != null) book.setYear(dto.getYear());
            if (dto.getImageUrl() != null) book.setImageUrl(dto.getImageUrl());
            return repository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public void deleteBook(Long id) {
        repository.deleteById(id);
    }
}
