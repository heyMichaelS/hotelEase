package com.br.hotelEase.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String nome;

    @NotNull
    @DecimalMin(value = "0.00")
    @Digits(integer = 8, fraction = 2)
    @Column(name = "preco", nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    private String categoria;

    private boolean disponivel = true;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull String getNome() {
        return nome;
    }

    public void setNome(@NotNull String nome) {
        this.nome = nome;
    }

    public @NotNull @DecimalMin(value = "0.00") @Digits(integer = 8, fraction = 2) BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(@NotNull @DecimalMin(value = "0.00") @Digits(integer = 8, fraction = 2) BigDecimal preco) {
        this.preco = preco;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }
}
