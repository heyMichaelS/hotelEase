package com.br.hotelEase.DTO;

import com.br.hotelEase.enuns.StatusComanda;

import java.math.BigDecimal;

public record ComandaDTO(Long id, Integer numeroQuarto, StatusComanda status, BigDecimal valorTotal) {
}
