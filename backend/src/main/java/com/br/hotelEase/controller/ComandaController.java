package com.br.hotelEase.controller;

import com.br.hotelEase.DTO.ComandaDTO;
import com.br.hotelEase.entity.Comanda;
import com.br.hotelEase.service.ComandaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comanda")
public class ComandaController {

    @Autowired
    private ComandaService comandaService;

    @GetMapping("/buscar-comanda")
    public ResponseEntity<List<Comanda>> buscarComanda() {
        List<Comanda> comandas = this.comandaService.listarComanda();
        return ResponseEntity.ok(comandas);
    }

    @GetMapping("/buscar-por-id/{id}")
    public ResponseEntity<Comanda> buscarComandaPorId(@PathVariable Long id) {
        return this.comandaService.buscarComanda(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/criar-comanda", consumes = "application/json")
    public ResponseEntity<Comanda> criarComanda(@RequestBody ComandaDTO comandaDTO) {
        Comanda salvo = this.comandaService.salvarComanda(comandaDTO);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/delete-comanda/{id}")
    public ResponseEntity<Void> deletarComanda(@PathVariable Long id) {
        this.comandaService.removerComanda(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar-comanda/{id}")
    public ResponseEntity<Comanda> atualizarComanda(@RequestBody ComandaDTO comandaDTO, @PathVariable Long id) {
        Comanda atualizado = this.comandaService.atualizarComanda(comandaDTO, id);
        return ResponseEntity.ok(atualizado);
    }
}