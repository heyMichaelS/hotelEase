package com.br.hotelEase.controller;

import com.br.hotelEase.DTO.UsuarioDTO;
import com.br.hotelEase.DTO.UsuarioDetailsDTO;
import com.br.hotelEase.entity.Usuario;
import com.br.hotelEase.service.UsuarioService;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/buscar-usuario")
    public ResponseEntity<List<Usuario>> buscarCliente() {
        List<Usuario> usuarios = this.usuarioService.listarUsuario();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/buscar-por-id/{id}")
    public ResponseEntity<Usuario> buscarClientePorId(@PathVariable Long id) {
        return this.usuarioService.buscarUsuario(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/criar-usuario", consumes = "application/json")
    public ResponseEntity<Usuario> criarCliente(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario salvo = this.usuarioService.salvarUsuario(usuarioDTO);
        return ResponseEntity.ok(salvo);
    }


    @DeleteMapping("/delete-usuario/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        this.usuarioService.removerUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar-usuario/{id}")
    public ResponseEntity<Usuario> atualizarCliente(@RequestBody UsuarioDTO usuarioDTO, @PathVariable Long id) {
        Usuario atualizado = this.usuarioService.atualizarUsuario(usuarioDTO, id);
        return ResponseEntity.ok(atualizado);
    }

    @GetMapping("/auth")
    public ResponseEntity<UsuarioDetailsDTO> getUsuarioLogado() {
        UsuarioDetailsDTO usuarioDetails = (UsuarioDetailsDTO) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(usuarioDetails);
    }


    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody UsuarioDTO dto) {
        try {
            usuarioService.criarUsuarioEmailSenha(dto);
            return ResponseEntity.ok("Usuário criado com sucesso!");
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro no Firebase: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar usuário.");
        }
    }
}