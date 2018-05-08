<template>
  <div class="card" id="card-reset">
    <div class="card-header">Восстановление аккаунта</div>
    <div class="card-body">
      <form @submit.prevent="">
        <div class="card-group">
          <label for="firstPassword">Введите новый пароль</label>
          <input class="form-control" type="password" id="firstPassword" v-model="firstPassword">
        </div>
        <div class="card-group">
          <label for="secondPassword">Подтвердите пароль</label>
          <input class="form-control" type="password" id="secondPassword" v-model="secondPassword">
        </div>
        <div class="card-group">
          <input type="submit" class="btn-primary" value="Изменить">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        firstPassword: '',
        secondPassword: '',
        err_msg_len: false,
        err_msg_eq: false
      }
    },
    methods: {
      submitPassword: function () {
        if (this.firstPassword.length < 8) this.err_msg_len = true
        else if (this.firstPassword !== this.secondPassword) this.err_msg_eq = true
        else {
          this.axios({
            method: 'post',
            url: 'http://learn/api/settingpassword',
            data: {
              password: this.firstPassword,
            }
          })
            .catch((error) => {
              if (error.response) {
                this.errorContainer = error.response.data.error
              } else if (error.request) {
                console.log('Ошибка запроса на сервер')
              } else {
                console.log('Error', error.message)
              }
            })
            .then((response) => {
            })
        }
      }
    }
  }
</script>

<style>
    #card-reset{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 50%;
      height: 270px;
    }
    .card-header{
      font-size: 18px;
      text-align: center;
    }
    .btn-primary{
      position: relative;
      margin: auto;
      margin-top: 10px;
    }
</style>
