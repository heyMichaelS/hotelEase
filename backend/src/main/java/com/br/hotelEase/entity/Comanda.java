package com.br.hotelEase.entity;

import com.br.hotelEase.enuns.StatusComanda;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "comanda")
public class Comanda {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "reserva_id", nullable = false)
    private Long reservaId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusComanda status = StatusComanda.ABERTA;

    @Column(name = "valor_total", nullable = false)
    private BigDecimal valorTotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getReservaId() {
        return reservaId;
    }

    public void setReservaId(Long reservaId) {
        this.reservaId = reservaId;
    }

    public StatusComanda getStatus() {
        return status;
    }

    public void setStatus(StatusComanda status) {
        this.status = status;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }
}
