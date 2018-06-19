<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>

<script>
  import SignIn from './components/SignIn'
  import SignUp from './components/SignUp'
  import userPage from './components/UserPage'

export default {
    name: 'app',
    components: {
      SignIn,
      SignUp,
      userPage
    },
    data () {
      return {
        responseFromServer: {
          id: '',
          login: '',
          permission: '',
          password: ''
        }
      }
    },
}
</script>

<style lang="scss">

  @import "~bootstrap/scss/bootstrap";

  body{
    background-image: url(./wallpaper-2979955.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }

  #btn_sbmt:disabled{
    background: lightgrey;
    color: #1d2124;
    border: solid darkgrey;
  }
  #btn_sbmt:disabled:hover{
    cursor: not-allowed;
  }
</style>
