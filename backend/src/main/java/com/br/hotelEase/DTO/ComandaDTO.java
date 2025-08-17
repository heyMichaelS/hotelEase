package com.br.hotelEase.DTO;

import com.br.hotelEase.enuns.StatusComanda;

import java.math.BigDecimal;

public record ComandaDTO(Long id, Long idReserva, StatusComanda status, BigDecimal valorTotal) {
}
