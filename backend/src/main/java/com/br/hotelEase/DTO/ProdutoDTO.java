package com.br.hotelEase.DTO;

import com.br.hotelEase.entity.Categoria;
import com.br.hotelEase.enuns.UnidadeMedida;

import java.math.BigDecimal;

public record ProdutoDTO(Long id, String nome, BigDecimal preco, Categoria categoria, boolean disponivel, BigDecimal quantidade, UnidadeMedida unidadeMedida) {
}
