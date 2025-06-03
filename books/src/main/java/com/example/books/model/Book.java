package com.example.books.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Cria getters, setters, toString, equals, hashCode
@NoArgsConstructor // Construtor vazio
@AllArgsConstructor // Construtor com todos os campos
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private int year;

    private String imageUrl;
}
