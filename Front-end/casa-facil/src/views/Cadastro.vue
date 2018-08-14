<template>
  <div class="container">
    <div class="col-sm-12 col-md-4 col-lg-5  center">
      <b-card title="Cadastre-se">
        <div class="row">

          <div style="margin-top: 15px; margin-bottom: -12px" class="col-sm-12 col-md-4 col-lg-12">
            <fb-signin-button
              :params="fbSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError">
              <b>Entre com uma conta facebook</b>
            </fb-signin-button>
          </div>

          <div style="margin-top: 15px" class="col-sm-12 col-md-4 col-lg-12">
            <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccessGoogle"
              @error="onSignInErrorGoogle">
              <b>Entre com uma conta google</b>
            </g-signin-button>
          </div>

          <div style="margin-bottom: -12px; margin-top: 15px" class="col-sm-12 col-md-4 col-lg-12">
            <p>ou</p>
          </div>

          <div style="margin-bottom: -12px" class="col-sm-12 col-md-4 col-lg-12">
            <p class="text-left">Digite seu nome e sobrenome:*</p>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12">
            <input type="text" id="nome" placeholder="Nome" v-model="novoUsuario.nome"
                   class="form-control col-sm-12 col-md-4 col-lg-12"/>
          </div>

          <div style="margin-top: 15px; margin-bottom: -12px" class="col-sm-12 col-md-4 col-lg-12">
            <p class="text-left">Digite seu número de telefone:</p>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12">
            <input type="text" placeholder="Número (opcional)" v-model="novoUsuario.numero" v-mask="'(##) #####-####'"
                   class="form-control col-sm-12 col-md-4 col-lg-12"/>
          </div>

          <div style="margin-top: 15px; margin-bottom: -12px" class="col-sm-12 col-md-4 col-lg-12">
            <p class="text-left">Digite seu Email:*</p>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12">
            <input type="text" id="email" placeholder="exemplo@dominio.com" v-model="novoUsuario.email"
                   class="form-control col-sm-12 col-md-4 col-lg-12"/>
          </div>

          <div style="margin-top: 15px; margin-bottom: -12px" class="col-sm-12 col-md-4 col-lg-12">
            <p class="text-left">Que tipo de usuário você é?</p>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12">
            <b-form-select id="tipoUsuario" v-model="novoUsuario.tipoUsuario" :options="tiposDeUsuario"
                           class="mb-3"></b-form-select>
          </div>

          <div style="margin-bottom: -12px" class="col-sm-12 col-md-4 col-lg-12">
            <p class="text-left">Digite sua senha:*</p>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12">
            <input type="password" id="senha" placeholder="Senha (mínimo 8 caracteres)" v-model="novoUsuario.senha"
                   class="form-control col-sm-12 col-md-4 col-lg-12"/>
          </div>

          <div style="margin-top: 15px; margin-bottom: -12px" class="col-sm-12 col-md-4 col-lg-12">
            <p class="text-left">Confirme sua senha:*</p>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12">
            <input type="password" id="confirmaSenha" placeholder="Digite sua senha novamente" v-model="confirmaSenha"
                   class="form-control col-sm-12 col-md-4 col-lg-12"/>
          </div>

          <div class="container" style="margin-top: 25px">
            <b-button class="form-control col-sm-12 col-md-4 col-lg-12" @click="validarEmail()" variant="info">Cadastrar</b-button>
          </div>

          <div class="container">
            <div style="width: 80%; margin: auto" class="col-sm-12 col-md-4 col-lg-12">
              <p>Ao se cadastrar no Casa Fácil você concorda com os
                <a href="https://github.com/WenderGalan/casa-facil-imoveis/blob/master/LICENSE" target="_blank">termos
                  de uso</a>.</p>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12">
            <p>Possui uma conta? <a href="#" @click="irLogin">Entre aqui</a></p>
          </div>
        </div>
      </b-card>
    </div>
    <div>
      <b-modal ref="myModalRef" hide-footer title="Código de validação da conta">
        <div class="d-block text-center">
          <p class="text-left">Enviamos o código de validação para seu email, por favor, digite o código abaixo</p>

          <div class="col-sm-12 col-md-4 col-lg-12">
            <input type="password" placeholder="Digite sua senha novamente" v-model="confirmaSenha"
                   class="form-control col-sm-12 col-md-4 col-lg-12"/>
          </div>
        </div>
        <b-btn class="mt-3" variant="outline-info" block @click="hideModal">Validar</b-btn>
      </b-modal>
    </div>
  </div>
</template>

<script>
import googleMixins from '../mixins/googleServiceMixins'
import mixinsFacebook from '../mixins/facebookServiceMixins'
import {enviarEmail} from '../services/requestServices'
export default {
  name: 'cadastro',
  data () {
    return {
      novoUsuario: {
        nome: '',
        numero: '',
        email: '',
        senha: '',
        tipoUsuario: null
      },
      confirmaSenha: '',
      tiposDeUsuario: [
        {
          value: 0,
          text: 'Sou pessoa física'
        },
        {
          value: 1,
          text: 'Sou corretor'
        },
        {
          value: 2,
          text: 'Sou uma empresa'
        }
      ],
      responseEmail: {}
    }
  },
  mixins: [
    googleMixins,
    mixinsFacebook
  ],
  methods: {
    // DIRECIONA O USUARIO PARA A TELA DE LOGIN
    irLogin () {
      this.$router.push({name: 'login'})
    },
    // FAZ A VALIDAÇÃO DOS CAMPOS
    validarCampos () {
      let validacao = true
      if (this.novoUsuario.nome === null || this.novoUsuario.nome.length < 4) {
        this.alertInput('nome')
        validacao = false
      }
      if (this.validateEmail() === false) {
        this.alertInput('email')
        validacao = false
      }
      if (this.novoUsuario.senha === null || this.novoUsuario.senha.length < 8) {
        this.alertInput('senha')
        validacao = false
      }
      if (this.novoUsuario.tipoUsuario === null) {
        this.alertInput('tipoUsuario')
        validacao = false
      }
      if (this.novoUsuario.senha !== this.confirmaSenha) {
        this.alertInput('senha')
        this.alertInput('confirmaSenha')
        validacao = false
      }
      return validacao
    },
    // COLOCA EM DESTAQUE OS INPUTS QUE PRECISAM SER PREENCHIDOS CORRETAMENTE
    alertInput (id) {
      document.getElementById(id).style.boxShadow = '0 0 0 0.2rem rgba(255, 0, 0, 0.25)'
      document.getElementById(id).style.borderColor = '#ff0000'
    },
    // FAZ A VALIDAÇÃO DO EMAIL
    validateEmail () {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.novoUsuario.email)
    },
    // ENVIA UM EMAIL DE VALIDAÇÃO PARA O EMAIL DA PESSOA
    validarEmail () {
      if (this.validarCampos()) {
        enviarEmail(this.novoUsuario.nome, this.novoUsuario.email).then((response) => {
          this.responseEmail = response.data
          this.showModal()
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // APARECE A MODAL NA TELA
    showModal () {
      this.$refs.myModalRef.show()
    },
    // ESCONDE A MODAL DA TELA
    hideModal () {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>

<style scoped>
  .center {
    width: 50%;
    padding: 10px;
    margin: auto;
  }
</style>