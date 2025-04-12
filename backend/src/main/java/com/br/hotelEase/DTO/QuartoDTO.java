package com.br.hotelEase.DTO;

import com.br.hotelEase.enuns.StatusQuarto;

import java.math.BigDecimal;

public record QuartoDTO(Integer numero, String tipo, BigDecimal precoDiaria, StatusQuarto status) {
}
