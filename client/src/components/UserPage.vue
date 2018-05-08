<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><div @click="pressExitButton" class="nav-key">Выйти</div></li>
          <li><div @click="this.$router.push('/Board')" class="nav-key">Задание</div></li>
          <li><div @click="this.$router.push('/Board')" class="nav-key">Ваш аккаунт</div></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
  export default{
    name: 'app',
    data () {
      return {
        token: this.$parent.$data.responseFromServer.token
      }
    },
    methods: {
      pressExitButton: function () {
        this.axios({
          method: 'delete',
          url: 'http://learn/api/exituser',
          headers: {'Content-type': this.token}
        })
          .catch(function (error) {
            console.log('Error', error.message)
          })
        this.token = null
        this.$parent.$emit('TokenLoader', this.token)
        this.$cookie.delete('token')
        this.$router.push('/signIn')
      }
    }
  }
</script>

<style lang="scss">

  @import "~bootstrap/scss/bootstrap";

  li{
    display: inline;
  }

  nav{

  }

  header{
    background: darkslateblue;
    postion: absolute;
    top:0;
    height: 100px;
  }

  .nav-key{
    position: relative;
    color: white;
    padding: 5px;
    float: right;
  }

  .nav-key:hover{
    background: white;
    color: black;
    cursor: pointer;
  }
</style>
