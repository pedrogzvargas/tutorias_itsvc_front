<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator" />
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      ref="file"
      type="file"
      :name="uploadFieldName"
      style="display:none"
      accept="image/png, image/gif, image/jpeg"
      @change="onFileChange(
        $event.target.name, $event.target.files)"
    >
    <!-- error dialog displays any potential error messages -->
    <v-dialog
      v-model="errorDialog"
      max-width="300"
    >
      <v-card>
        <v-card-text class="subheading">
          {{ errorText }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            flat
            @click="errorDialog = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ImageInput',
    props: {
      // Use "value" to enable using v-model
      value: Object,
    },
    data: () => ({
      errorDialog: null,
      errorText: '',
      uploadFieldName: 'file',
      maxSize: 1024,
    }),
    methods: {
      launchFilePicker () {
        this.$refs.file.click()
      },
      async onFileChange (fieldName, file) {
        const { maxSize } = this
        const imageFile = file[0]
        if (file.length > 0) {
          const size = imageFile.size / maxSize / maxSize
          if (!imageFile.type.match('image.*')) {
            // check whether the upload is an image
            this.errorDialog = true
            this.errorText = 'Please choose an image file'
          } else if (size > 1) {
            // check whether the size is greater than the size limit
            this.errorDialog = true
            this.errorText = 'Your file is too big! Please select an image under 1MB'
          } else {
            // Append file into FormData and turn file into image URL
            const formData = new FormData()
            const imageURL = URL.createObjectURL(imageFile)
            let fileAsBase64 = ''
            await this.getBase64FromImage(imageFile).then(function (result) {
              fileAsBase64 = result
            })
            formData.append(fieldName, imageFile)
            // Emit the FormData and image URL to the parent component
            this.$emit('input', { formData, imageURL, fileAsBase64 })
          }
        }
      },
      getBase64FromImage (fileData) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            resolve(reader.result)
          }
          reader.onerror = reject
          reader.readAsDataURL(fileData)
        })
      },
    },
  }
</script>
