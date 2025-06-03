package com.example.books.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookUpdateDTO {
    private String title;
    private String author;
    private Integer year;
    private String imageUrl;
}
