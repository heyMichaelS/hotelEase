package com.br.hotelEase.entity;


import com.br.hotelEase.enuns.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    @Email
    @NotBlank
    @Column(unique = true, nullable = false)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank
    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario", nullable = false)
    private TipoUsuario tipoUsuario;

    @NotBlank
    @Size(max = 14)
    @Pattern(regexp = "\\d{11}|\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "usuario.cpfPattern")
    @Column(nullable = false, unique = true)
    private String cpf;

    @Pattern(regexp = "\\(?\\d{2}\\)?\\s?9?\\d{4}-\\d{4}", message = "usuario.telefone")
    private String telefone;

    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @PrePersist
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public @Email @NotBlank String getEmail() {
        return email;
    }

    public void setEmail(@Email @NotBlank String email) {
        this.email = email;
    }

    public @NotBlank String getSenha() {
        return senha;
    }

    public void setSenha(@NotBlank String senha) {
        this.senha = senha;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public @NotBlank @Size(max = 14) @Pattern(regexp = "\\d{11}|\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "cliente.cpfPattern") String getCpf() {
        return cpf;
    }

    public void setCpf(@NotBlank @Size(max = 14) @Pattern(regexp = "\\d{11}|\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "cliente.cpfPattern") String cpf) {
        this.cpf = cpf;
    }

    public @Pattern(regexp = "\\(?\\d{2}\\)?\\s?9?\\d{4}-\\d{4}", message = "cliente.telefone") String getTelefone() {
        return telefone;
    }

    public void setTelefone(@Pattern(regexp = "\\(?\\d{2}\\)?\\s?9?\\d{4}-\\d{4}", message = "cliente.telefone") String telefone) {
        this.telefone = telefone;
    }
}
