package com.br.hotelEase.service;

import com.br.hotelEase.DTO.UsuarioDTO;
import com.br.hotelEase.entity.Usuario;
import com.br.hotelEase.repository.UsuarioRepository;
import com.br.hotelEase.utils.MensagemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MensagemService mensagemService;

    public Usuario salvarUsuario(Usuario usuario) {
        return this.usuarioRepository.save(usuario);
    }

    public void removerUsuario(Long id) {
        if (!this.usuarioRepository.existsById(id)) {
            throw new EntityNotFoundException(mensagemService.getMensagem(
                    "usuario.nao.encontrado", id));
        }
        this.usuarioRepository.deleteById(id);
    }

    public List<Usuario> listarUsuario() {
        return this.usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarUsuario(Long id) {
        return this.usuarioRepository.findById(id);
    }

    public Usuario atualizarUsuario(UsuarioDTO usuarioDTO, Long id) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(mensagemService.getMensagem("usuario.nao.encontrado", id)));

        usuario.setNome(usuarioDTO.nome());
        usuario.setSenha(usuarioDTO.senha());
        usuario.setTipoUsuario(usuarioDTO.tipoUsuario());
        usuario.setCpf(usuarioDTO.cpf());
        usuario.setTelefone(usuarioDTO.telefone());

        return this.usuarioRepository.save(usuario);
    }
}
