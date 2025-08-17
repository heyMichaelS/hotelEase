package com.br.hotelEase.controller;

import com.br.hotelEase.DTO.ProdutoDTO;
import com.br.hotelEase.entity.Produto;
import com.br.hotelEase.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/buscar-produto")
    public ResponseEntity<List<Produto>> buscarProduto() {
        List<Produto> produto = this.produtoService.listarProduto();
        return ResponseEntity.ok(produto);
    }

    @GetMapping("/buscar-por-id/{id}")
    public ResponseEntity<Produto> buscarProdutoPorId(@PathVariable Long id) {
        return this.produtoService.buscarProduto(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/criar-produto", consumes = "application/json")
    public ResponseEntity<Produto> criarProduto(@RequestBody ProdutoDTO produtoDTO) {
        Produto salvo = this.produtoService.salvarProduto(produtoDTO);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/delete-produto/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        this.produtoService.removerProduto(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar-produto/{id}")
    public ResponseEntity<Produto> atualizarProduto(@RequestBody ProdutoDTO produtoDTO, @PathVariable Long id) {
        Produto atualizado = this.produtoService.atualizarProduto(produtoDTO, id);
        return ResponseEntity.ok(atualizado);
    }
}
