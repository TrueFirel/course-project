<template>

</template>

<script>
  export default{
    data(){
      return {
        fieldData:{
          login: '',
          email: '',
          password: '',
          permission: ''
        },
        pickedLogin: this.$parent.pickedUser,
        sendingAccount: {},
        perm_send: '',
        isReqSuccess: false,
        loginErrorContainer: '',
        emailErrorContainer: '',
        errorContainer: '',
        isPressedButton: false,
        isEmptyAllFields: false
      }
    },

    methods:{

    }
  }
</script>

<style>

</style>

