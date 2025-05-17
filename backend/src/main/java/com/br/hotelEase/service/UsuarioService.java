package com.br.hotelEase.service;

import com.br.hotelEase.DTO.UsuarioDTO;
import com.br.hotelEase.entity.Usuario;
import com.br.hotelEase.enuns.TipoUsuario;
import com.br.hotelEase.repository.UsuarioRepository;
import com.br.hotelEase.utils.MensagemService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MensagemService mensagemService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @Transactional
    public Usuario salvarUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDTO.nome());
        usuario.setEmail(usuarioDTO.email());
        usuario.setSenha(usuarioDTO.senha());
        usuario.setTipoUsuario(usuarioDTO.tipoUsuario());
        usuario.setCpf(usuarioDTO.cpf());
        usuario.setTelefone(usuarioDTO.telefone());
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
        usuario.setEmail(usuarioDTO.email());
        usuario.setSenha(usuarioDTO.senha());
        usuario.setTipoUsuario(usuarioDTO.tipoUsuario());
        usuario.setCpf(usuarioDTO.cpf());
        usuario.setTelefone(usuarioDTO.telefone());

        return this.usuarioRepository.save(usuario);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(
                        mensagemService.getMensagem("email.nao.encontrado", email)
                ));
    }

    public Usuario criarUsuarioEmailSenha(UsuarioDTO dto) throws FirebaseAuthException {
        Optional<Usuario> existente = usuarioRepository.findByEmail(dto.email());

        if (existente.isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }

        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(dto.email())
                .setPassword(dto.senha());

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        String senhaHash = encoder.encode(dto.senha());

        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(senhaHash);
        usuario.setCpf(dto.cpf());
        usuario.setTelefone(dto.telefone());
        usuario.setTipoUsuario(dto.tipoUsuario() != null ? dto.tipoUsuario() : TipoUsuario.CLIENTE);

        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario salvarUsuarioGoogle(String nome, String email) {
        Usuario usuario = new Usuario();
        usuario.setNome(nome != null ? nome : "Usuário Google");
        usuario.setEmail(email);
        usuario.setSenha(null);
        usuario.setCpf(null);
        usuario.setTelefone(null);
        usuario.setTipoUsuario(TipoUsuario.CLIENTE);

        return usuarioRepository.save(usuario);
    }

}
