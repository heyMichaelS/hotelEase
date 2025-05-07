package com.br.hotelEase.utils;

import com.google.cloud.storage.HttpMethod;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/*")
                .allowedOrigins("http://localhost:5173")
                .allowedHeaders("")
                .allowedMethods("GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS");
    }
}