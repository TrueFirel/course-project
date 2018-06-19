<template>
  <div class="text-dark" style="font-family: Arial;">
    <div class="card" style="width: 30rem; margin:8% auto;">
      <div class="bg-light">
        <div class="card-header">
          <div style="font-size: 18px; text-align: center;">
            Регистрация
          </div>
        </div>
        <div class="card-body">
          <div class="card-text">
            <form role="form" @submit.prevent="verifyFields">
              <div class="form-group">
                <label for="login">Логин</label>
                <input type="text" id="login" v-model="fieldData.login"  class="form-control">
                <small v-if="isEmptylog && isPressedButton"  class="text-danger">*Логин должен быть не менее 6 символов</small>
                <small class="text-danger" v-model="loginErrorContainer">{{loginErrorContainer}}</small>
              </div>
              <div class="form-group">
                <label for="fpass">Пароль</label>
                <input type="password" class="form-control" id="fpass" v-model="fieldData.fpass">
                <small v-if="isEmptyPass && isPressedButton" class="text-danger">*Пароль должен быть не менее 8 символов</small>
              </div>
              <div class="form-group">
                <label for="spass">Подтвердите пароль</label>
                <input type="password" id="spass" v-model="spass" class="form-control">
                <small type="password" v-if="isPasswordsInequal && isPressedButton" class="text-danger">*Пароли не совпадают</small>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" v-model="fieldData.email" id="email">
                <small  v-if="isEmptyEmail && isPressedButton" class="text-danger">*Обязательное поле</small>
                <small class="text-danger" v-model="emailErrorContainer">{{emailErrorContainer}}</small>
              </div>
              <div class="form-group">
                <label>
                  <input type="checkbox"> Ознакомлен с пользовательским соглашением
                </label>
              </div>

              <div class="form-group">
                <input type="submit" id="btn_sbmt" value="Зарегистрироваться" class="btn-primary" style="border-radius: 5px; width: 100%;" >
              </div>
              <small class="text-primary"><router-link to="/signIn">Уже зарегистрированы - Войти</router-link></small>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable key-spacing,keyword-spacing */

  export default{
    data () {
      return{
        fieldData:{
          login:'',
          fpass:'',
          email:''
        },
        loginErrorContainer: '',
        emailErrorContainer: '',
        errorContainer: '',
        isPressedButton: false,
        isEmptylog: false,
        isEmptyPass: false,
        spass:'',
        isEmptyEmail: false,
        isPasswordsInequal: false
      }
    },
    methods:{
      verifyFields : function () {
        var errCounter = 0
        if(!this.isPressedButton) {
          this.isPressedButton = true
        }

        if(this.fieldData.login.length < 6) {
          this.isEmptylog = true
          errCounter++
        } else this.isEmptylog = false

        if(this.fieldData.fpass.length < 8) {
          this.isEmptyPass = true
          errCounter++
        } else this.isEmptyPass = false;

        if(this.fieldData.fpass !== this.spass) {
          this.isPasswordsInequal = true;
          errCounter++
        } else this.isPasswordsInequal = false;

        if(this.fieldData.email === '') {
          this.isEmptyEmail = true;
          errCounter++
        } else this.isEmptyEmail = false;
        if(errCounter === 0) {
          document.getElementById('btn_sbmt').disabled = true;
          this.axios({
            method: 'post',
            url: 'http://localhost:8081/register',
            data: {
              login: this.fieldData.login,
              password: this.fieldData.fpass,
              email: this.fieldData.email
            }
          })
            .then((response) => {
              document.getElementById('btn_sbmt').disabled = false
              if (response.data.login !== '') {
                this.$parent.login = response.data.login;
                this.$parent.permission = response.data.permission;
                this.$router.push('/userPage')
              }
            })
            .catch((error) => {
              if (error.request) {
                document.getElementById('btn_sbmt').disabled = false
                this.loginErrorContainer = error.response.data.login_error
                this.emailErrorContainer = error.response.data.email_error
                if (this.loginErrorContainer === undefined) this.loginErrorContainer = ''
                if (this.emailErrorContainer === undefined) this.emailErrorContainer = ''
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
</style>
