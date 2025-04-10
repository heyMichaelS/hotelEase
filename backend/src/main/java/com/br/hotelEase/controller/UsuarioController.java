package com.br.hotelEase.controller;

import com.br.hotelEase.DTO.UsuarioDTO;
import com.br.hotelEase.entity.Usuario;
import com.br.hotelEase.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Usuario> criarCliente(@RequestBody Usuario usuario) {
        Usuario salvo = this.usuarioService.salvarUsuario(usuario);
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
}
