<template>
  <div id="divNavBar">
    <b-navbar type="dark" variant="primary" toggleable id="navbar">
      <b-navbar-brand href="#" @click="irHome" style="padding: 0px">
        <img src="../assets/logo.png" style="max-height: 40px"></b-navbar-brand>

      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item style="margin-left: 15px" href="#" @click="irHome"><i class="fa fa-home" aria-hidden="true"></i>
            Início
          </b-nav-item>
          <b-nav-item href="#" v-if="verificarSessao && verificarCnpj" @click="adicionarAnuncio">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Adicionar anúncio
          </b-nav-item>
          <b-nav-item href="#" v-if="verificarCnpj" @click="visualizarAnuncios">
            <i class="fa fa-list" aria-hidden="true"></i> Meus anúncios
          </b-nav-item>
          <b-nav-item href="#" v-if="verificarCpf" @click="irFavoritos">
            <i class="fa fa-list" aria-hidden="true"></i> Favoritos
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" v-if="!verificarSessao" @click="irCadastro">Cadastre-se</b-nav-item>
          <b-nav-item href="#" v-if="!verificarSessao" @click="irLogin">Entrar</b-nav-item>
          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown v-if="verificarSessao" :text="user" right>
            <b-dropdown-item href="#" @click="irPerfil" v-if="verificarSessao">Perfil</b-dropdown-item>
            <b-dropdown-item href="#" @click="sair" v-if="verificarSessao">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'PrivateTemplate',
    data() {
      return {
        user: 'User'
      }
    },
    methods: {
      irCadastro() {
        this.$router.push({name: 'cadastro'})
      },
      irLogin() {
        this.$router.push({name: 'login'})
      },
      irHome() {
        this.$router.push({name: 'home'})
      },
      sair() {
        this.$store.commit('alterarSessao', undefined)
        this.$router.push({name: 'home'})
      },
      adicionarAnuncio() {
        this.$router.push({name: 'cadastroDomicilio'})
      },
      irPerfil() {
        const id = this.$store.state.sessao.id
        this.$router.push(
          {
            name: 'perfil',
            params: {id}
          })
      },
      irFavoritos() {
        this.$router.push({name: 'favoritos'})
      },
      visualizarAnuncios() {
        const id = this.$store.state.sessao.id
        this.$router.push(
          {
            name: 'meusAnuncios',
            params: {id}
          })

      }
    },
    computed: {
      verificarSessao() {
        if (this.$store.state.sessao !== undefined) {
          this.user = this.$store.state.sessao.nome
        }
        return this.$store.state.sessao !== undefined
      },
      verificarCnpj() {
        if (this.$store.state.sessao !== undefined) return !!this.$store.state.sessao.cnpj;
        return false;
      },
      verificarCpf() {
        if (this.$store.state.sessao !== undefined) return !!this.$store.state.sessao.cpf
        return false;
      }
    }
  }
</script>

<style scoped>
  #navbar {
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
  }
</style>
