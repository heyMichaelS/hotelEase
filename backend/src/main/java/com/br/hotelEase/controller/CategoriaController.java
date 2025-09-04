package com.br.hotelEase.controller;

import com.br.hotelEase.DTO.CategoriaDTO;
import com.br.hotelEase.entity.Categoria;
import com.br.hotelEase.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/buscar-categoria")
    public ResponseEntity<List<Categoria>> buscarCategoria() {
        List<Categoria> categorias = this.categoriaService.listarCategoria();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/buscar-por-id/{id}")
    public ResponseEntity<Categoria> buscarCategoriaPorId(@PathVariable Long id) {
        return this.categoriaService.buscarCategoria(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/criar-categoria", consumes = "application/json")
    public ResponseEntity<Categoria> criarCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        Categoria salvo = this.categoriaService.salvarCategoria(categoriaDTO);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/delete-categoria/{id}")
    public ResponseEntity<Void> deletarCategoria(@PathVariable Long id) {
        this.categoriaService.removerCategoria(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar-categoria/{id}")
    public ResponseEntity<Categoria> atualizarCategoria(@RequestBody CategoriaDTO categoriaDTO, @PathVariable Long id) {
        Categoria atualizado = this.categoriaService.atualizarCategoria(categoriaDTO, id);
        return ResponseEntity.ok(atualizado);
    }
}
