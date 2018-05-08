<template>
  <div  class="text-dark" style="font-family: Arial;">
    <div>
      <div class="card" style="width: 30rem; margin: 12% auto;">
        <div class="bg-light" >
          <div class="card-header" style="font-size: 18px; text-align: center;">
            Вход
          </div>
        </div>
        <div class="card-body">
          <div class="card-text">
            <form role="form" @submit.prevent="fieldValidation">
              <div class="form-group">
                <label for="login">Логин</label>
                <input type="text" class="form-control" id="login" v-model="fieldData.login">
                <small class="text-danger" v-if="isPressedButton && isEmptyLogin">*Обязательное поле</small>
              </div>
              <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" class="form-control" id="password" v-model="fieldData.password">
                <small class="text-danger" v-if="isPressedButton && isEmptyPassword">*Обязательное поле</small>
              </div>
              <small class="text-danger" v-model="errorContainer">{{errorContainer}}</small>
              <div class="form-group">
                <label>
                  <input type="checkbox" v-model="fieldData.isRemember" @click="fieldData.isRemember = !fieldData.isRemember"> Запомнить меня
                </label>
              </div>
              <div class="form-group">
                <input type="submit" value="Вход" class="btn-primary" id="btn_sbmt" style="border-radius: 5px; width: 100%;" >
              </div>
              <small class="text-primary"><router-link to="/signUp">Еще не зарегистрированы?</router-link></small>
              <small class="text-primary"><router-link to="/restore" style="float: right;">Забыли пароль?</router-link></small>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        fieldData: {
          login: '',
          password: '',
          isRemember: false
        },
        errorContainer: '',
        isEmptyLogin: false,
        isEmptyPassword: false,
        isPressedButton: false,
        isButtonDisabled: false
      }
    },
    methods: {
      fieldValidation: function () {
        var errCounter = 0
        if (!this.isPressedButton) {
          this.isPressedButton = true
        }
        if (this.fieldData.login.length === 0) {
          this.isEmptyLogin = true
          errCounter++
        } else {
          this.isEmptyLogin = false
        }

        if (this.fieldData.password.length === 0) {
          this.isEmptyPassword = true
          errCounter++
        } else {
          this.isEmptyPassword = false
        }
        if (errCounter === 0) {
          document.getElementById('btn_sbmt').disabled = true
          this.axios({
            method: 'post',
            url: 'http://localhost:8081/login',
            data: {
              login: this.fieldData.login,
              password: this.fieldData.password
            }
          })
            .then((response) => {
              document.getElementById('btn_sbmt').disabled = false
              if (response.data.token !== null) {
                this.$router.push('/userPage')
              }
            })
            .catch((error) => {
              document.getElementById('btn_sbmt').disabled = false
              if (error.response) {
                this.errorContainer = 'Неверный логин или пароль'
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
