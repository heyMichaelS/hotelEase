package com.br.hotelEase.service;

import com.br.hotelEase.DTO.QuartoDTO;
import com.br.hotelEase.entity.Quarto;
import com.br.hotelEase.repository.QuartoRepository;
import com.br.hotelEase.utils.MensagemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuartoService {

    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private MensagemService mensagemService;

    public Quarto salvarQuarto(QuartoDTO quartoDTO) {
        Quarto quarto = new Quarto();
        quarto.setNumero(quartoDTO.numero());
        quarto.setTipo(quartoDTO.tipo());
        quarto.setPrecoDiaria(quartoDTO.precoDiaria());
        quarto.setStatus(quartoDTO.status());
        return this.quartoRepository.save(quarto);
    }

    public void removerQuarto(Long id) {
        if (!this.quartoRepository.existsById(id)) {
            throw new EntityNotFoundException(mensagemService.getMensagem(
                    "quarto.nao.encontrado", id));
        }
        this.quartoRepository.deleteById(id);
    }

    public List<Quarto> listarQuarto() {
        return this.quartoRepository.findAll();
    }

    public Optional<Quarto> buscarQuarto(Long id) {
        return this.quartoRepository.findById(id);
    }

    public Quarto atualizarQuarto(QuartoDTO quartoDTO, Long id) {
        Quarto quarto = this.quartoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(mensagemService.getMensagem("quarto.nao.encontrado", id)));

        quarto.setNumero(quartoDTO.numero());
        quarto.setTipo(quartoDTO.tipo());
        quarto.setPrecoDiaria(quartoDTO.precoDiaria());
        quarto.setStatus(quartoDTO.status());

        return this.quartoRepository.save(quarto);
    }
}
