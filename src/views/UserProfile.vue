<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="9"
      >
        <app-card class="mt-4 text-center">
<!--          <v-img-->
<!--            class="rounded-circle elevation-6 mt-n12 d-inline-block"-->
<!--            :src="data.profileImage ? data.profileImage : require('@/assets/no-image.png')"-->
<!--            width="140"-->
<!--            height="140"-->
<!--          />-->
          <image-input
            v-model="avatar"
            @input="setValue($event)"
          >
            <div slot="activator">
              <v-avatar
                v-if="!avatar"
                class="rounded-circle elevation-6 mt-n12 d-inline-block"
                v-ripple
                size="150px"
              >
                <!--<span>Agregar imagen</span>-->
                <img
                  :src="data.profileImage ? data.profileImage : require('@/assets/no-image.png')"
                  alt="avatar"
                >
              </v-avatar>
              <v-avatar
                v-else
                v-ripple
                size="150px"
                class="mb-3"
              >
                <img
                  :src="avatar.imageURL"
                  alt="avatar"
                >
              </v-avatar>
            </div>
          </image-input>
          <v-slide-x-transition>
            <div v-if="avatar && saved === false">
              <v-btn
                class="primary"
                :loading="saving"
                @click="uploadImage"
              >
                Guardar foto
              </v-btn>
            </div>
          </v-slide-x-transition>
          <v-card-text class="text-center">
            <h4 class="text-h3 mb-1 text--primary">
              {{ this.data.fullName }}
            </h4>

<!--            <h6 class="text-h5 mb-2 text&#45;&#45;secondary">-->
<!--              11VC0091-->
<!--            </h6>-->
            <profile-form />
          </v-card-text>
        </app-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ProfileForm from '../components/user/ProfileForm'
  import ImageInput from '../components/common/general/ImageInput'
  import ProfileImageService from '../services/user/ProfileImageService'
  import { sync } from 'vuex-pathify'
  export default {
    name: 'UserProfileView',
    components: {
      ProfileForm,
      ImageInput,
    },
    data: () => ({
      tabs: null,
      avatar: null,
      saving: false,
      saved: false,
    }),
    computed: {
      ...sync('user', [
        'data',
      ]),
    },
    watch: {
      avatar: {
        handler: function () {
          this.saved = false
        },
        deep: true,
      },
    },
    methods: {
      uploadImage () {
        this.saving = true
        setTimeout(() => this.savedAvatar(), 1000)
        ProfileImageService.post(this.data.userId, { profile_image: this.avatar.fileAsBase64 }).then(
          (response) => {
            // this.notify('Agregado correctamente', 'success')
            // this.$emit('listUpdated')
            this.data.profileImage = this.avatar.fileAsBase64
          },
        ).catch(
          (response) => {
            // this.notify('No se pudo agregar correctamente', 'error')
            return Promise.reject(response)
          },
        )
      },
      savedAvatar () {
        this.saving = false
        this.saved = true
      },
      setValue (value) {
        console.info(value)
      },
    },
  }
</script>
