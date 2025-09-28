package com.br.hotelEase.DTO;

import com.br.hotelEase.entity.Produto;

import java.util.List;

public record CategoriaDTO (Long id, String nome, String descricao, List<Produto> produtos) {
}
