import { useUserStore } from '../store/userStore.js';
export default{
setup(){
    const store= useUserStore()
    return { store }
 },
  async isUserAdmin(){
    const user= await getUserInfo(this.store.getToken)
    if(user.role_id==1){
      return true;
    }else{
      return false;
    }
  }
}
