package com.br.hotelEase.controller;

import com.br.hotelEase.DTO.ReservaDTO;
import com.br.hotelEase.entity.Reserva;
import com.br.hotelEase.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping("/buscar-reserva")
    public ResponseEntity<List<Reserva>> buscarReserva() {
        List<Reserva> Reservas = this.reservaService.listarReserva();
        return ResponseEntity.ok(Reservas);
    }

    @GetMapping("/buscar-por-id/{id}")
    public ResponseEntity<Reserva> buscarReservaPorId(@PathVariable Long id) {
        return this.reservaService.buscarReserva(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/criar-reserva", consumes = "application/json")
    public ResponseEntity<Reserva> criarReserva(@RequestBody ReservaDTO ReservaDTO) {
        Reserva salvo = this.reservaService.salvarReserva(ReservaDTO);
        return ResponseEntity.ok(salvo);
    }
    
    @DeleteMapping("/delete-reserva/{id}")
    public ResponseEntity<Void> deletarReserva(@PathVariable Long id) {
        this.reservaService.removerReserva(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar-reserva/{id}")
    public ResponseEntity<Reserva> atualizarReserva(@RequestBody ReservaDTO ReservaDTO, @PathVariable Long id) {
        Reserva atualizado = this.reservaService.atualizarReserva(ReservaDTO, id);
        return ResponseEntity.ok(atualizado);
    }
}
