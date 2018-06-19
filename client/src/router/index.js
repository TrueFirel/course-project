import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'
import Home from '@/components/UserPage'
import Task from '@/components/Task'
import ResetPassword from '@/components/ResetPassword'
import SetPassword from '@/components/SetPassword'
import UserControl from '@/components/UserControl'
import EditUser from "@/components/EditUser"
import AddUser from "@/components/AddUser"
import DeleteUser from "@/components/DeleteUser"
import ShowUsers from "@/components/ShowUsers"
import Edditing from "@/components/Edditing"

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
        {
          path: '/Task',
          name: 'Task',
          component: Task
        },
        {
          path: '/UserControl',
          name: 'UserControl',
          component: UserControl,
          children :[
            {
              path: '/EditUser',
              name: 'EditUser',
              component: EditUser,
              children:[
                {
                  path: '/Edditing',
                  name: 'Edditing',
                  component: Edditing
                }
              ]
            },
            {
              path: '/DeleteUser',
              name: 'DeleteUser',
              component: DeleteUser
            },
            {
              path: '/ShowUsers',
              name: 'ShowUsers',
              component: ShowUsers
            },
            {
              path: '/AddUser',
              name: 'AddUser',
              component: AddUser
            }
          ]
        }
      ]
    }
  ]
})
