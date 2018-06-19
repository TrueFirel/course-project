<template>
  <div>
    <div class="card" id="pos">
      <div class="card-header">Восстановление пароля</div>
      <div class="card-body">
        <form @submit.prevent="sendEmailToServer">
          <div class="card-group">
            <label for="email">Введите ваш email для восстановления пароля</label>
            <input class="form-control" v-model="email" id="email" type="email">
          </div>
          <div class="card-group">
            <input class="btn-primary" type="submit" id="btn_sbmt" value="Отправить сообщение" @click="succ_msg = true">
          </div>
        </form>
      </div>
    </div>
    <div class="float-msg" v-if="succ_msg === true" v-model="succ_msg"></div>
    <div class="card" id="s-msg" v-if="succ_msg === true" v-model="succ_msg">
      <div class="card-group" id="info">
        На вашу почту {{email}} отправлено письмо с ссылкой для изменения пароля.
      </div>
      <button class="btn-success" id="btn-ok" @click="succ_msg = false">ОК</button>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        email: '',
        err_msg: false,
        succ_msg: false
      }
    },
    methods: {
      ableBtn: function () {
        document.getElementById('btn_sbmt').disabled = false
      },
      sendEmailToServer: function () {
        if (this.email === '') this.err_msg = true
        else {
          document.getElementById('btn_sbmt').disabled = true
          this.axios({
            method: 'post',
            url: 'http://learn/api/resetpassword',
            data: {
              email: this.email
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
          setTimeout(this.ableBtn, 3000)
        }
      }
    }
  }
</script>

<style>

  @keyframes blacking {
    0% {opacity: 0;}
    100% {opacity: 0.7;}
  }

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
</style>
