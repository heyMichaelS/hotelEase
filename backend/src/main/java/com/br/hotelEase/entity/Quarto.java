package com.br.hotelEase.entity;

import com.br.hotelEase.enuns.StatusQuarto;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Entity
@Table(name = "quarto")
public class Quarto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(nullable = false, unique = true)
    private Integer numero;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String tipo;

    @NotNull
    @DecimalMin(value = "0.00", inclusive = true)
    @Digits(integer = 8, fraction = 2)
    @Column(name = "preco_diaria", nullable = false, precision = 10, scale = 2)
    private BigDecimal precoDiaria;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusQuarto status = StatusQuarto.DISPONIVEL;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getPrecoDiaria() {
        return precoDiaria;
    }

    public void setPrecoDiaria(BigDecimal precoDiaria) {
        this.precoDiaria = precoDiaria;
    }

    public StatusQuarto getStatus() {
        return status;
    }

    public void setStatus(StatusQuarto status) {
        this.status = status;
    }
}