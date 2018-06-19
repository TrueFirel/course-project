<template>
  <div>
    <div class="text-center">Редактирование аккаунтов</div>

    <div v-if="isClicked === true" v-model="isClicked">
      <div v-model="pickedName"><div class="text-center text-success">{{pickedName}}</div></div>
      <div class="float-msg" v-if="isReqSuccess === true" v-model="isReqSuccess"></div>
      <div class="card" id="s-msg" v-if="isReqSuccess === true" v-model="isReqSuccess">
        <div class="card-group" id="info">
          Аккаунт был успешно добавлен
        </div>
        <button class="btn-success" id="btn-ok" @click="isReqSuccess = false">ОК</button>
      </div>

      <form role="form" @submit.prevent="verifyFields">
        <div class="form-group">
          <label for="login">Изменение логина</label>
          <input type="text" id="login" v-model="fieldData.login"  class="form-control">
          <small class="text-danger" v-model="loginErrorContainer">{{loginErrorContainer}}</small>
        </div>
        <div class="form-group">
          <label for="password">Изменение пароля</label>
          <input type="password" class="form-control" id="password" v-model="fieldData.password">
        </div>
        <div class="form-group">
          <label for="email">Изменение Email</label>
          <input type="email" class="form-control" v-model="fieldData.email" id="email">
          <small class="text-danger" v-model="emailErrorContainer">{{emailErrorContainer}}</small>
        </div>
        <div class="form-group">
          <label for="select">Изменение роли: </label>
          <select v-model="fieldData.permission" name="select" id="select">
            <option>Пользователь</option>
            <option>Администратор</option>
          </select>
          <input type="submit" id="btn_sbmt" value="Отправить" class="btn-primary" style="border-radius: 5px; float: right;" >
        </div>
        <small class="text-danger" v-if="isPressedButton && isEmptyAllFields">Необходимо внести изменения!</small>
      </form>
    </div>

    <ul id ="v-for-object" v-model="userArray" class="demo" style="margin-top:20px;">
      <li v-for="(item, index) in userArray" v-model="pickedIndex" id="index" class="btn btn-outline-success list-btn" @click = "clickButton(index)">{{item.login}}</li>
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
        isClicked: false,
        pickedIndex: 0,
        pickedAccount: {},
        fieldData:{
          login: '',
          email: '',
          password: '',
          permission: ''
        },
        sendingAccount: {
          login: '',
          email: '',
          password: '',
          permission: ''
        },
        perm_send: '',
        isReqSuccess: false,
        loginErrorContainer: '',
        emailErrorContainer: '',
        errorContainer: '',
        isPressedButton: false,
        isEmptyAllFields: false,
        pickedName: ''
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
    methods:{
      clickButton: function (index) {
        for(let key in this.fieldData) {
          this.fieldData[key] = '';
          this.sendingAccount[key] = '';
        }
        this.pickedIndex = index;
        this.pickedName = this.userArray[index].login;
        this.isClicked = true;
      },
      verifyFields: function(){

        let errCounter = 0;
        this.isPressedButton = true;

        if (this.fieldData.password === '' && this.fieldData.permission === '' && this.fieldData.permission === '' && this.fieldData.login === '') {
          this.isEmptyAllFields = true;
          errCounter++;
        } else this.isEmptyAllFields = false;


        for (let key in this.fieldData) {
          if(this.fieldData[key] === '') this.sendingAccount[key] = this.userArray[this.pickedIndex][key];
          else this.sendingAccount[key] = this.fieldData[key];
        }

        if(this.sendingAccount.permission === 'Администратор') this.sendingAccount.permission = 'a';
        if(this.sendingAccount.permission === 'Пользователь') this.sendingAccount.permission = 'u';

        if(errCounter === 0) {
          this.axios({
            method:'post',
            url:'http://localhost:8081/update',
            data:{
              whichAccount: this.userArray[this.pickedIndex],
              onAccount: this.sendingAccount
            }
          }).then((response)=>{

            this.emailErrorContainer= '';
            this.loginErrorContainer = '';
            this.$parent.userArray = response.data;
            this.pickedName = this.sendingAccount.login;
            this.userArray = response.data;
            console.log(response.data);

          }).catch((error) => {
            this.loginErrorContainer = error.response.data.loginError;
            this.emailErrorContainer = error.response.data.emailError;
            if(this.loginErrorContainer === undefined) this.loginErrorContainer = '';
            if(this.emailErrorContainer === undefined) this.emailErrorContainer= '';
            console.log(error);
          })
        }
      }
    }
  }
</script>

<style>
</style>
