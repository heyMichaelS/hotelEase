package com.br.hotelEase.service;

import com.br.hotelEase.DTO.CategoriaDTO;
import com.br.hotelEase.entity.Categoria;
import com.br.hotelEase.repository.CategoriaRepository;
import com.br.hotelEase.utils.MensagemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private MensagemService mensagemService;

    public Categoria salvarCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = new Categoria();

        categoria.setNome(categoriaDTO.nome());
        categoria.setDescricao(categoriaDTO.descricao());

        return this.categoriaRepository.save(categoria);
    }

    public void removerCategoria(Long id) {
        if (!this.categoriaRepository.existsById(id)) {
            throw new EntityNotFoundException(mensagemService.getMensagem(
                    "categoria.nao.encontrado", id));
        }
        this.categoriaRepository.deleteById(id);
    }

    public List<Categoria> listarCategoria() {
        return this.categoriaRepository.findAll();
    }

    public Optional<Categoria> buscarCategoria(Long id) {
        return this.categoriaRepository.findById(id);
    }

    public Categoria atualizarCategoria(CategoriaDTO categoriaDTO, Long id) {
        Categoria categoria = this.categoriaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(mensagemService.getMensagem("categoria.nao.encontrado", id)));

        categoria.setNome(categoriaDTO.nome());
        categoria.setDescricao(categoriaDTO.descricao());

        return this.categoriaRepository.save(categoria);
    }
}
