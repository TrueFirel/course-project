<template>
 <div>
   <div class="float-msg" v-if="isReqSuccess === true" v-model="isReqSuccess"></div>
   <div class="card" id="s-msg" v-if="isReqSuccess === true" v-model="isReqSuccess">
     <div class="card-group" id="info">
       Аккаунт был успешно добавлен
     </div>
     <button class="btn-success" id="btn-ok" @click="isReqSuccess = false">ОК</button>
   </div>

   <form role="form" @submit.prevent="verifyFields">
     <div class="form-group">
       <label for="login">Логин</label>
       <input type="text" id="login" v-model="fieldData.login"  class="form-control">
       <small v-if="isEmptylog && isPressedButton"  class="text-danger">*Логин должен быть не менее 6 символов</small>
       <small class="text-danger" v-model="loginErrorContainer">{{loginErrorContainer}}</small>
     </div>
     <div class="form-group">
       <label for="password">Пароль</label>
       <input type="password" class="form-control" id="password" v-model="fieldData.password">
       <small v-if="isEmptyPass && isPressedButton" class="text-danger">*Пароль должен быть не менее 8 символов</small>
     </div>
     <div class="form-group">
       <label for="email">Email</label>
       <input type="email" class="form-control" v-model="fieldData.email" id="email">
       <small  v-if="isEmptyEmail && isPressedButton" class="text-danger">*Обязательное поле</small>
       <small class="text-danger" v-model="emailErrorContainer">{{emailErrorContainer}}</small>
     </div>
     <div class="form-group">
       <label for="select">Роль: </label>
       <select v-model="fieldData.permission" name="select" id="select">
         <option>Пользователь</option>
         <option>Администратор</option>
       </select>
       <small class="text-danger" v-if="isPressedButton && isSelected">Нужно указать роль!</small>
       <input type="submit" id="btn_sbmt" value="Отправить" class="btn-primary" style="border-radius: 5px; float: right;" >
     </div>
   </form>
 </div>
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
      perm_send: '',
      isReqSuccess: false,
      loginErrorContainer: '',
      emailErrorContainer: '',
      errorContainer: '',
      isPressedButton: false,
      isEmptylog: false,
      isEmptyPass: false,
      isEmptyEmail: false,
      isSelected: false,

    }
  },
  methods:{
    verifyFields : function () {
      let errCounter = 0
      if(!this.isPressedButton) {
        this.isPressedButton = true
      }

      if(this.fieldData.login.length < 6) {
        this.isEmptylog = true;
        errCounter++;
      } else this.isEmptylog = false;

      if(this.fieldData.password.length < 8) {
        this.isEmptyPass = true;
        errCounter++;
      } else this.isEmptyPass = false;

      if(this.fieldData.email === '') {
        this.isEmptyEmail = true;
        errCounter++
      } else this.isEmptyEmail = false;

      if(this.fieldData.permission === '') {
        errCounter++;
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }

      if(this.fieldData.permission === 'Пользователь') this.perm_send = 'u';
      if(this.fieldData.permission === 'Администратор') this.perm_send = 'a';

      if(errCounter === 0) {
        document.getElementById('btn_sbmt').disabled = true;
        this.axios({
          method: 'post',
          url: 'http://localhost:8081/register',
          data: {
            login: this.fieldData.login,
            password: this.fieldData.password,
            email: this.fieldData.email,
            permission: this.perm_send
          }
        })
          .then((response) => {
            document.getElementById('btn_sbmt').disabled = false;
            if (response.data) {
              this.isReqSuccess = true;
              this.$parent.userArray = response.data.u_arr
            }
          })
          .catch((error) => {
            if (error.request) {
              document.getElementById('btn_sbmt').disabled = false;
              this.loginErrorContainer = error.response.data.login_error;
              this.emailErrorContainer = error.response.data.email_error;
              if (this.loginErrorContainer === undefined) this.loginErrorContainer = '';
              if (this.emailErrorContainer === undefined) this.emailErrorContainer = '';
            } else if (error.request) {
              console.log('Ошибка запроса на сервер')
            } else {
              console.log('Error', error.message)
            }
          })
      }
    }

  }
}
</script>

<style>

  #pos {
    font-size: 16px;
    width: 50%;
    height: 200px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .card-header {
    font-size: 18px;
    text-align: center;
  }
  .btn-primary {
    position: relative;
    margin: auto;
    margin-top: 10px;
  }
  #s-msg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 150px;
    width: 40%;
  }
  #btn-ok {
    display: inline;
    margin-left: 38%;
    text-align: center;
    margin-top: 3%;
    width: 25%;
  }
  #info {
    display: inline;
    text-align: center;
    margin-top: 5%;
  }

  .float-msg {
    position: absolute;
    background: black;
    opacity: 0.7;
    animation-name: blacking;
    animation-duration: 1s;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  @keyframes blacking {
    0% {opacity: 0;}
    100% {opacity: 0.7;}
  }

</style>

