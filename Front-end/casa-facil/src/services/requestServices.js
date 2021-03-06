import http from './http'

export const login = (email, senha) => http.get(`/usuarios/v1/login?email=${email}&senha=${senha}`);

export const criarCliente = user => http.post('/usuarios/v1/cliente', user);

export const addFav = (idCliente, idAnuncio) => http.post(`/favoritos/v1/cliente/${idCliente}/anuncio/${idAnuncio}`);

export const removeFav = id => http.delete(`/favoritos/v1/${id}`);

export const trazerFavoritos = id => http.get(`/favoritos/v1/cliente/${id}`);

export const criarAnunciante = user => http.post('/usuarios/v1/anunciante', user);

export const enviarEmail = (nome, email) => http.get(`/email/v1/email-enviar-codigo?nome=${nome}&email=${email}`);

export const alterarUsuario = (user) => http.put('/usuarios/v1', user);

export const deletarUsuario = (id) => http.delete(`usuarios/v1/${id}`);

export const buscarAnuncios = (url) => http.get(url);

export const autoComplete = (search) => http.get(`/anuncios/v1/autocomplete?pesquisa=${search}`);

export const buscarAnunciosUsuario = (id, page) => http.get(`/anuncios/v1?id=${id}&page=${page}&size=20`);

export const buscarAnuncio = (id) => http.get(`/anuncios/v1/${id}`);

export const salvarAnuncio = (idUsuario, anuncio) => http.post(`/anuncios/v1/${idUsuario}`, anuncio);

export const alterarAnuncio = (anuncio) => http.put('/anuncios/v1', anuncio);

export const excluirAnuncio = (idAnuncio) => http.delete(`/anuncios/v1/${idAnuncio}`);

export const gerarRelatorio = (tipoNegocio, id, tipoRelatorio, tipoTemplate) => http.get(`/anuncios/relatorio/venda/${id}?tipoNegocio=${tipoNegocio}&tipoRelatorio=${tipoRelatorio}&tipoTemplate=${tipoTemplate}`);

export const enviarEmailAnuncio = (email, idAnuncio) => http.post(`email/v1/email-enviar-contato/${idAnuncio}`, email);

export const salvarImagensAnuncio = (idAnuncio, imagens) => http.post(`/file/v1/enviar-imagens-anuncio/${idAnuncio}`, imagens);

export const salvarImagemUsuario = (idUser, imagem) => http.post(`/file/v1/enviar-imagem-user/${idUser}`, imagem);

export const excluirImagemAnuncio = (id) => http.delete(`/file/v1/deletar-imagem-anuncio/${id}`);
