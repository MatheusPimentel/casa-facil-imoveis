package com.casafacilimoveis.service;

import com.casafacilimoveis.model.entities.Anunciante;
import com.casafacilimoveis.model.entities.Cliente;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

/**
 * casafacilimoveis
 * Wender Galan
 * Todos os direitos reservados ©
 * *********************************************
 * Nome do arquivo: UsuarioService.java
 * Criado por : Wender Galan
 * Data da criação : 25/09/2018
 * Observação :
 * *********************************************
 */
public interface UsuarioService {

    public ResponseEntity buscarTodos(String search);

    public ResponseEntity buscarPorId(Integer id);

    public ResponseEntity salvarAnunciante(Anunciante usuario, BindingResult result);

    public ResponseEntity salvarCliente(Cliente cliente, BindingResult result);

    public ResponseEntity alterarAnunciante(Anunciante anunciante, BindingResult result);

    public ResponseEntity alterarCliente(Cliente cliente, BindingResult result);

    public ResponseEntity excluirPorId(Integer id);

    public ResponseEntity logarUsuario(String email, String senha);
}
