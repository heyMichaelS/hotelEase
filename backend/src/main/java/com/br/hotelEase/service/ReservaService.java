package com.br.hotelEase.service;

import com.br.hotelEase.DTO.ReservaDTO;
import com.br.hotelEase.entity.Quarto;
import com.br.hotelEase.entity.Reserva;
import com.br.hotelEase.entity.Usuario;
import com.br.hotelEase.repository.QuartoRepository;
import com.br.hotelEase.repository.ReservaRepository;
import com.br.hotelEase.repository.UsuarioRepository;
import com.br.hotelEase.utils.MensagemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private MensagemService mensagemService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private QuartoRepository quartoRepository;

    public Reserva salvarReserva(ReservaDTO reservaDTO) {
        Reserva reserva = new Reserva();

        Usuario usuario = usuarioRepository.findById(reservaDTO.usuarioId())
                .orElseThrow(() -> new EntityNotFoundException("usuario.nao.encontrado" + reservaDTO.usuarioId()));
        reserva.setUsuario(usuario);

        Quarto quarto = quartoRepository.findById(reservaDTO.quartoId())
                .orElseThrow(() -> new EntityNotFoundException("quarto.nao.encontrado" + reservaDTO.quartoId()));
        reserva.setQuarto(quarto);

        if (reservaDTO.atualizadoPor() != null) {
            Usuario atualizadoPor = usuarioRepository.findById(reservaDTO.atualizadoPor())
                    .orElseThrow(() -> new EntityNotFoundException("usuario.nao.encontrado" + reservaDTO.atualizadoPor()));
            reserva.setAtualizadoPor(atualizadoPor);
        }

        reserva.setDataCheckout(reservaDTO.dataCheckout());
        reserva.setStatus(reservaDTO.status());
        reserva.setAtualizadoEm(reservaDTO.atualizadoEm());
        return reservaRepository.save(reserva);
    }

    public void removerReserva(Long id) {
        if (!this.reservaRepository.existsById(id)) {
            throw new EntityNotFoundException(mensagemService.getMensagem(
                    "reserva.nao.encontrado", id));
        }
        this.reservaRepository.deleteById(id);
    }

    public List<Reserva> listarReserva() {
        return this.reservaRepository.findAll();
    }

    public Optional<Reserva> buscarReserva(Long id) {
        return this.reservaRepository.findById(id);
    }

    public Reserva atualizarReserva(ReservaDTO reservaDTO, Long id) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(mensagemService.getMensagem("reserva.nao.encontrado", id)));

        Usuario usuario = usuarioRepository.findById(reservaDTO.usuarioId())
                .orElseThrow(() -> new EntityNotFoundException("usuario.nao.encontrado" + reservaDTO.usuarioId()));
        reserva.setUsuario(usuario);

        Quarto quarto = quartoRepository.findById(reservaDTO.quartoId())
                .orElseThrow(() -> new EntityNotFoundException("quarto.nao.encontrado" + reservaDTO.quartoId()));
        reserva.setQuarto(quarto);

        if (reservaDTO.atualizadoPor() != null) {
            Usuario atualizadoPor = usuarioRepository.findById(reservaDTO.atualizadoPor())
                    .orElseThrow(() -> new EntityNotFoundException("usuario.nao.encontrado" + reservaDTO.atualizadoPor()));
            reserva.setAtualizadoPor(atualizadoPor);
        }

        reserva.setDataCheckout(reservaDTO.dataCheckout());
        reserva.setStatus(reservaDTO.status());
        reserva.setAtualizadoEm(reservaDTO.atualizadoEm());
        return reservaRepository.save(reserva);
    }

}
