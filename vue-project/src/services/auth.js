import { useUserStore } from '../store/userStore.js';
import { getUserInfo } from '../services/MovieAPI.js';
export default{
setup(){
    const store= useUserStore()
    return { store }
},
 async isUserAdmin(){
    //const user= await getUserInfo(this.store.getToken)
    const user= await getUserInfo(useUserStore().getToken)
    if(user.role_id==1){
      return true;
    }else{
      return false;
    }
  },
  getToken(){
    return useUserStore().getToken;
 }
}
