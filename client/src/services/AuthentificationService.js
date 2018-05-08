import Api from '@/services/Api'

export default{
  register(credentials){
    Api().post('register', credentials);

  }
}

// AuthentificationService.register({
//   email: 'testing@gmail.com',
//   password: '123456'
// })
