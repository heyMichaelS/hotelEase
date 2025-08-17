package com.br.hotelEase.service;

import com.br.hotelEase.DTO.ComandaDTO;
import com.br.hotelEase.entity.Comanda;
import com.br.hotelEase.repository.ComandaRepository;
import com.br.hotelEase.utils.MensagemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComandaService {

    @Autowired
    private ComandaRepository comandaRepository;

    @Autowired
    private MensagemService mensagemService;

    public Comanda salvarComanda(ComandaDTO comandaDTO) {
        Comanda comanda = new Comanda();
        comanda.setReservaId(comandaDTO.idReserva());
        comanda.setStatus(comandaDTO.status());
        comanda.setValorTotal(comandaDTO.valorTotal());
        return this.comandaRepository.save(comanda);
    }

    public void removerComanda(Long id) {
        if (!this.comandaRepository.existsById(id)) {
            throw new EntityNotFoundException(mensagemService.getMensagem(
                    "comanda.nao.encontrado", id));
        }
        this.comandaRepository.deleteById(id);
    }

    public List<Comanda> listarComanda() {
        return this.comandaRepository.findAll();
    }

    public Optional<Comanda> buscarComanda(Long id) {
        return this.comandaRepository.findById(id);
    }

    public Comanda atualizarComanda(ComandaDTO comandaDTO, Long id) {
        Comanda comanda = this.comandaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(mensagemService.getMensagem("comanda.nao.encontrado", id)));

        comanda.setReservaId(comandaDTO.idReserva());
        comanda.setStatus(comandaDTO.status());
        comanda.setValorTotal(comandaDTO.valorTotal());

        return this.comandaRepository.save(comanda);
    }
}
