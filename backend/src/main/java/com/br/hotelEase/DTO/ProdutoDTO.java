package com.br.hotelEase.DTO;

import java.math.BigDecimal;

public record ProdutoDTO(Long id, String nome, BigDecimal preco, String categoria, boolean disponivel) {
}
