package com.br.hotelEase.security;

import com.br.hotelEase.DTO.UsuarioDTO;
import com.br.hotelEase.DTO.UsuarioDetailsDTO;
import com.br.hotelEase.entity.Usuario;
import com.br.hotelEase.enuns.TipoUsuario;
import com.br.hotelEase.service.UsuarioService;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    private final FirebaseApp firebaseApp;
    private final UsuarioService usuarioService;

    @Autowired
    public FirebaseAuthenticationFilter(FirebaseApp firebaseApp, UsuarioService usuarioService) {
        this.firebaseApp = firebaseApp;
        this.usuarioService = usuarioService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = parseToken(request);

            if (token != null) {
                FirebaseToken decodedToken = FirebaseAuth.getInstance(firebaseApp).verifyIdToken(token);
                String email = decodedToken.getEmail();
                String nome = decodedToken.getName();

                if (email != null) {
                    Usuario usuario = usuarioService.buscarPorEmail(email);

                    if (usuario == null) {
                        usuario = usuarioService.salvarUsuarioGoogle(nome, email);
                        System.out.println("Novo usuário Google salvo no banco: " + email);
                    } else {
                        System.out.println("Usuário já existe no banco: " + email);
                    }

                    UsuarioDetailsDTO usuarioDetails = new UsuarioDetailsDTO(usuario);
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(usuarioDetails, null, usuarioDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido ou expirado: " + e.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String parseToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return (StringUtils.hasText(header) && header.startsWith("Bearer ")) ? header.substring(7) : null;
    }
}
