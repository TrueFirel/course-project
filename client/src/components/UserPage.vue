<template>
  <div >

    <div class="container-flexible bg-dark">
      <div class="navbar navbar-collapse" style="height: 50px; padding-top: 20px;">
        <ul>
          <li><div @click="pressExitButton" class="nav-key">Выйти</div></li>
          <li><div @click="pressMenuButton(1)" class="nav-key">Задание</div></li>
          <li><div @click="pressMenuButton(2)" class="nav-key">Ваш аккаунт</div></li>
          <li><div @click="pressMenuButton(3)" v-model="this.permission" v-if="this.$parent.permission === 'a'" class="nav-key">Управление пользователями</div></li>
        </ul>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>



<script>

  import Task from "./Task"
  import UserControl from "./UserControl"

  export default{
    name: 'app',
    data () {
      return {
        permission: '',
        login: '',
        password: ''
      }
    },
    methods: {
      pressMenuButton: function(chs){
        switch(chs){
          case 1:{this.$router.push("/Task"); break;}
          case 2:{this.$router.push("/Account"); break;}
          case 3:{this.$router.push("/UserControl"); break;}
        }
      },
      pressExitButton: function () {
        this.$router.push('/signIn')
      }
    },
    created: function(){

      this.permission = this.$parent.permission;
      this.login = this.$parent.login;
      console.log(this.login);
      this.password= this.$parent.password;
      if(this.login === '' || this.permission === '' || this.password === '') this.$router.push("/signIn")
    },
    components: {
      Task,
      UserControl
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
