<template>
  <v-menu
    v-if="data.userId"
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="$router.push('/profile/')">
        <v-list-item-title>Perfil</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2 mt-2" />
      <v-list-item @click="logOut">
        <v-list-item-title>Cerrar sesión</v-list-item-title>
      </v-list-item>
<!--      <template>-->
<!--        <app-bar-item-->
<!--          to="/"-->
<!--        >-->
<!--          <v-list-item-title>Perfil</v-list-item-title>-->
<!--        </app-bar-item>-->
<!--        <v-divider-->
<!--          class="mb-2 mt-2"-->
<!--        />-->

<!--        <app-bar-item>-->
<!--          <v-list-item-title @click="logOut">Cerrar Sesión</v-list-item-title>-->
<!--        </app-bar-item>-->
<!--      </template>-->
    </v-list>
  </v-menu>
</template>

<script>
  import { get, sync } from 'vuex-pathify'
  export default {
    name: 'DefaultAccount',

    data: () => ({
      profile: [
        { title: 'Perfil' },
        { divider: true },
        { title: 'Cerrar sesión' },
      ],
    }),
    computed: {
      ...get('user', [
        'data',
      ]),
      ...sync('app', [
        'drawerSide',
      ]),
    },
    methods: {
      logOut () {
        this.data.userId = null
        this.drawerSide = false
        this.$router.push('/login/')
      },
    },
  }
</script>
