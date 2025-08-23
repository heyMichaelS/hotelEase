package com.br.hotelEase.utils;

import com.br.hotelEase.security.FirebaseAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, FirebaseAuthenticationFilter firebaseFilter) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(firebaseFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/usuario/cadastro").permitAll()
                        .requestMatchers("/usuario/auth").authenticated()
                        .requestMatchers("/usuario/buscar-usuario").authenticated()
                        .requestMatchers("/usuario/buscar-por-id/**").authenticated()
                        .requestMatchers("/usuario/criar-usuario").authenticated()
                        .requestMatchers("/usuario/atualizar-usuario/**").authenticated()
                        .requestMatchers("/usuario/delete-usuario/**").authenticated()
                        .requestMatchers("/comanda/buscar-comanda").authenticated()
                        .requestMatchers("/comanda/buscar-por-id/**").authenticated()
                        .requestMatchers("/comanda/criar-comanda").authenticated()
                        .requestMatchers("/comanda/atualizar-comanda/**").authenticated()
                        .requestMatchers("/comanda/delete-comanda/**").authenticated()
                        .requestMatchers("/produto/buscar-produto").authenticated()
                        .requestMatchers("/produto/buscar-por-id/**").authenticated()
                        .requestMatchers("/produto/criar-produto").authenticated()
                        .requestMatchers("/produto/atualizar-produto/**").authenticated()
                        .requestMatchers("/produto/delete-produto/**").authenticated()
                        .requestMatchers("/quarto/buscar-quarto").authenticated()
                        .requestMatchers("/quarto/buscar-por-id/**").authenticated()
                        .requestMatchers("/quarto/criar-quarto").authenticated()
                        .requestMatchers("/quarto/atualizar-quarto/**").authenticated()
                        .requestMatchers("/quarto/delete-quarto/**").authenticated()
                        .requestMatchers("/reserva/buscar-reserva").authenticated()
                        .requestMatchers("/reserva/buscar-por-id/**").authenticated()
                        .requestMatchers("/reserva/criar-reserva").authenticated()
                        .requestMatchers("/reserva/atualizar-reserva/**").authenticated()
                        .requestMatchers("/reserva/delete-reserva/**").authenticated()
                        .anyRequest().permitAll()
                )
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint((request, response, authException) ->
                                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Não autorizado")
                        )
                );
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}