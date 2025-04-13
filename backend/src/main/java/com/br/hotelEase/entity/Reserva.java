package com.br.hotelEase.entity;

import com.br.hotelEase.enuns.StatusReserva;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDateTime;

@Entity
@Table(name = "reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "quarto_id")
    private Quarto quarto;

    @PastOrPresent
    @Column(name = "data_checkin", nullable = false, updatable = false)
    private LocalDateTime dataCheckin = LocalDateTime.now();

    @FutureOrPresent
    @Column(name = "data_checkout")
    private LocalDateTime dataCheckout;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusReserva status = StatusReserva.ATIVA;

    @PastOrPresent
    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "atualizado_por")
    private Usuario atualizadoPor;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Quarto getQuarto() {
        return quarto;
    }

    public void setQuarto(Quarto quarto) {
        this.quarto = quarto;
    }

    public LocalDateTime getDataCheckin() {
        return dataCheckin;
    }

    public void setDataCheckin(LocalDateTime dataCheckin) {
        this.dataCheckin = dataCheckin;
    }

    public LocalDateTime getDataCheckout() {
        return dataCheckout;
    }

    public void setDataCheckout(LocalDateTime dataCheckout) {
        this.dataCheckout = dataCheckout;
    }

    public StatusReserva getStatus() {
        return status;
    }

    public void setStatus(StatusReserva status) {
        this.status = status;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public LocalDateTime getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(LocalDateTime atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }

    public Usuario getAtualizadoPor() {
        return atualizadoPor;
    }

    public void setAtualizadoPor(Usuario atualizadoPor) {
        this.atualizadoPor = atualizadoPor;
    }

}
