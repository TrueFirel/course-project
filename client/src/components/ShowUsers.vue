<template>
  <div>
    <div class="text-center">Просмотр существующих аккаунтов</div>
    <ul id ="v-for-object" v-model="userArray" class="demo" style="margin-top:20px;">
      <li v-for="(item, index) in userArray" id="index" class="btn btn-outline-dark show-btn">{{item.login}}</li>
    </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        stateError: false,
        userArray: this.$parent.userArray,
        login: this.$parent.login,
        password: this.$parent.password,
        permission: this.$parent.permission,
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
  .show-btn{
    margin-top: 5px;
    margin-right: 5px;
  }
</style>
