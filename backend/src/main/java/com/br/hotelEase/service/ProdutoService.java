package com.br.hotelEase.service;

import com.br.hotelEase.DTO.ProdutoDTO;
import com.br.hotelEase.entity.Produto;
import com.br.hotelEase.repository.ProdutoRepository;
import com.br.hotelEase.utils.MensagemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private MensagemService mensagemService;

    public Produto salvarProduto(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        produto.setNome(produtoDTO.nome());
        produto.setPreco(produtoDTO.preco());
        produto.setCategoria(produtoDTO.categoria());
        produto.setDisponivel(produtoDTO.disponivel());
        return this.produtoRepository.save(produto);
    }

    public void removerProduto(Long id) {
        if (!this.produtoRepository.existsById(id)) {
            throw new EntityNotFoundException(mensagemService.getMensagem(
                    "produto.nao.encontrado", id));
        }
        this.produtoRepository.deleteById(id);
    }

    public List<Produto> listarProduto() {
        return this.produtoRepository.findAll();
    }

    public Optional<Produto> buscarProduto(Long id) {
        return this.produtoRepository.findById(id);
    }

    public Produto atualizarProduto(ProdutoDTO produtoDTO, Long id) {
        Produto produto = this.produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(mensagemService.getMensagem("produto.nao.encontrado", id)));

        produto.setNome(produtoDTO.nome());
        produto.setPreco(produtoDTO.preco());
        produto.setCategoria(produtoDTO.categoria());
        produto.setDisponivel(produtoDTO.disponivel());

        return this.produtoRepository.save(produto);
    }
}