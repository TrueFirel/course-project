<template>
  <div>
    <div class="text-center">Выберите аккаунт для удаления</div>
      <ul id ="v-for-object" v-model="userArray" class="demo" style="margin-top:20px;">
        <li v-for="(item, index) in userArray" id="index"><button @click="ClickLogin(index)" data-toggle="modal" data-target="#myModal" class="btn btn-outline-danger list-btn">{{item.login}}</button></li>
      </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        stateError: false,
        userArray: this.$parent.userArray,
        login: this.$parent.login,
        password: this.$parent.password,
        permission: this.$parent.permission,
      }
    },
    methods:{
      ClickLogin: function(index){
        let deleteData = this.userArray[index];
        this.axios({
          method:'delete',
          url:'http://localhost:8081/deleteAcc',
          data:{
            login: deleteData.login,
            password: deleteData.password
          }
        }).then((response)=>{
          if(response.data.result === undefined) console.log("Данный пользователь уже отсутствует в базу данных")
          else {
            let btns = document.getElementsByClassName("btn btn-outline-danger list-btn");
            for(let i=0; i<btns.length;i++){
              if(i === index) btns[i].remove();
            }
            delete this.userArray[index];
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created:function(){

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
        else {
          this.userArray = response.data;
          this.$parent.userArray = response.data;
        }
      }).catch((error)=>{
        this.stateError = true;
      })
    },
  }
</script>

<style>
  .list-btn{
    margin-top: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
</style>
