package com.br.hotelEase.DTO;

import com.br.hotelEase.enuns.StatusReserva;

import java.time.LocalDateTime;

public record ReservaDTO(Long usuarioId, Long quartoId, LocalDateTime dataCheckout,
                         StatusReserva status, LocalDateTime atualizadoEm,
                         Long atualizadoPor) {


}
