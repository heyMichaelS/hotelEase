package com.br.hotelEase.DTO;

import com.br.hotelEase.enuns.TipoUsuario;

public record UsuarioDTO(String nome, String email, String senha, TipoUsuario tipoUsuario, String cpf,
                         String telefone) {
}
