<template>
  <div class="container-fluid" style="margin-top: 5%; width: 80%;">
    <div class="card">
      <div class="card-header">
        <div style="float:left; margin-left: 5px; margin-top: 5px; " class="">Управление пользователями</div>
        <div class="btn-group" role="group" aria-label="Управление" style="float:right;" v-model="userArray">
          <button type="button" id="1" class="btn btn-secondary" @click = "pressAnyButton(1)">Добавление</button>
          <button type="button" id="2" class="btn btn-secondary" @click = "pressAnyButton(2)">Удаление</button>
          <button type="button" id="3" class="btn btn-secondary" @click = "pressAnyButton(3)">Редактирование</button>
          <button type="button" id="4" class="btn btn-secondary" @click = "pressAnyButton(4)">Вывод</button>
        </div>
      </div>
      <div class="card-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import EditUser from "./EditUser"
  import AddUser from "./AddUser"
  import DeleteUser from "./DeleteUser"
  import ShowUsers from "./ShowUsers"

  export default{
    data(){
      return{
        login: this.$parent.login,
        permission: this.$parent.permission,
        password: this.$parent.password,
        userArray: []
      }
    },
    methods: {
      pressAnyButton: function(btn){
        switch(btn){
          case 1:{
            let btns = this.getElementsByClassName("btn btn-secondary active");
            for(let i = 0;i<btns.length;i++) btns[i].setAttribute('class', 'btn btn-secondary active');
            document.getElementById("1").setAttribute('class', 'btn btn-secondary active');
            this.$router.push("/AddUser");
            break;
          }
          case 2:{
            let btns = this.getElementsByClassName("btn btn-secondary active");
            for(let i = 0;i<btns.length;i++) btns[i].setAttribute('class', 'btn btn-secondary active');
            document.getElementById("2").setAttribute('class', 'btn btn-secondary active');
            this.$router.push("/DeleteUser");
            break;
          }
          case 3:{
            let btns = this.getElementsByClassName("btn btn-secondary active");
            for(let i = 0;i<btns.length;i++) btns[i].setAttribute('class', 'btn btn-secondary active');
            document.getElementById("3").setAttribute('class', 'btn btn-secondary active');
            this.$router.push("/EditUser");
            break;
          }
          case 4:{
            let btns = document.getElementsByClassName("btn btn-secondary active");
            for(let i = 0;i<btns.length;i++) btns[i].setAttribute('class', 'btn btn-secondary active');
            document.getElementById("3").setAttribute('class', 'btn btn-secondary active');
            this.$router.push("/ShowUsers");
            break;
          }
        }
      }
    },
    created: function(){

      if(this.login === undefined || this.password === undefined) this.$router.push("/signIn");


      else{
        this.axios({
          method:'post',
          url: 'http://localhost:8081/getUserArray',
          data: {
            login: this.login,
            password: this.password,
            permission: this.permission
          }
        }).then((response)=>{
          if(!response.data) this.stateError = true;
          else this.userArray = response.data;
          this.$router.push("/AddUser")
          document.getElementById("1").setAttribute('class', 'btn btn-secondary active');
        }).catch((error)=>{
          this.stateError = true;
        })
      }
    }
  }

</script>

<style>

</style>
