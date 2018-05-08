<template>
  <div>
    <div id="cardBlock" class="card">
      <span class="card-header">Введите номер телепхона</span>
        <div class="card-body">
          <form @submit.prevent="">
            <span class="form-group">
              <input type="text" content="number" v-model="number" id="phone" class="form-control" @keyup = 'isValidInput'>
            </span>
            <span class="msg" v-if="showMessage"> <div style="position: absolute"></div> <div id="triangle"></div>Неверный формат ввода</span>
            <div class="form-group">
              <input type="submit" id="btn" class="btn-primary">
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
export default{
  data () {
    return {
      number: '',
      showMessage: false,
      errPtr: 0
    }
  },
  methods: {
    isValidInput: function () {
      var searchIn = this.number
      for (var i = 0; i < this.number.length; i++) {
        if (isNaN(searchIn[i])) {
          this.showMessage = true
          return
        }
      }
      this.showMessage = false
    }
  }
}
</script>

<style>
  .msg{
    border:1px solid grey;
    border-radius: 2px;
    text-align: center;
    font-family: Calibri;
    font-size: 16px;
    background:white;
    position: absolute;
    left:103%;
    bottom:50%;
    width:150px;
    transition-property: background-position;
    transition: all 3s;
  }
#cardBlock{
  margin:18% auto;
  width:50%;
  height:5%;
}
.card-body{
  position: relative;
}
.form-group{
margin-top:1%;
}
.form-control{
  display: inline;
}
  #triangle{
    position: absolute;
    left:-3%;
    top: 25%;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 5px solid white;
  }
</style>
