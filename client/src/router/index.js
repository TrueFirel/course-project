import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'
import Home from '@/components/UserPage'
import Task from '@/components/Task'
import ResetPassword from '@/components/ResetPassword'
import SetPassword from '@/components/SetPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signIn',
      name: 'login',
      component: SignIn
    },
    {
      path: '/restore',
      name: 'restore-password',
      component: ResetPassword
    },
    {
      path: '/passwordSetting',
      name: 'password-set',
      component: SetPassword
    },
    {
      path: '/signUp',
      name: 'Register',
      component: SignUp
    },
    {
      path: '/userPage',
      name: 'homepage',
      component: Home,
      children: [
      ]
    },
    {
      path: '/myTask',
      name: 'Task',
      component: Task
    }
  ]
})
