package com.br.hotelEase.controller;

import com.br.hotelEase.DTO.QuartoDTO;
import com.br.hotelEase.entity.Quarto;
import com.br.hotelEase.service.QuartoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quarto")
public class QuartoController {

    @Autowired
    private QuartoService quartoService;

    @GetMapping("/buscar-quarto")
    public ResponseEntity<List<Quarto>> buscarQuarto() {
        List<Quarto> quarto = this.quartoService.listarQuarto();
        return ResponseEntity.ok(quarto);
    }

    @GetMapping("/buscar-por-id/{id}")
    public ResponseEntity<Quarto> buscarQuartoPorId(@PathVariable Long id) {
        return this.quartoService.buscarQuarto(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/criar-quarto", consumes = "application/json")
    public ResponseEntity<Quarto> criarQuarto(@RequestBody QuartoDTO quartoDTO) {
        Quarto salvo = this.quartoService.salvarQuarto(quartoDTO);
        return ResponseEntity.ok(salvo);
    }


    @DeleteMapping("/delete-quarto/{id}")
    public ResponseEntity<Void> deletarQuarto(@PathVariable Long id) {
        this.quartoService.removerQuarto(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar-quarto/{id}")
    public ResponseEntity<Quarto> atualizarQuarto(@RequestBody QuartoDTO quartoDTO, @PathVariable Long id) {
        Quarto atualizado = this.quartoService.atualizarQuarto(quartoDTO, id);
        return ResponseEntity.ok(atualizado);
    }
}
