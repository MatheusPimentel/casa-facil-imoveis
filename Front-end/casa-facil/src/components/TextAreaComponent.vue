<template>
  <div class="col-sm-12 col-md-4 col-lg-12">
    <div class="col-sm-12 col-md-4 col-lg-12" v-if="label.length > 0">
      <p class="text-left">{{label}}</p>
    </div>

    <div class="col-sm-12 col-md-4 col-lg-12">
      <textarea :id="id" rows="9" class="form-control" v-model="value"></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TextAreaComponent",
    props: {
      label: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: '',
        required: true
      }
    },
    data() {
      return {
        value: ''
      }
    },
    watch: {
      value(value) {
        const obj = {
          id: this.id,
          message: value
        };
        this.$emit('resultadoTextArea', obj)
      }
    }
  }
</script>

<style scoped>
  p {
    margin-top: 15px;
    margin-bottom: 5px;
  }
</style>