/**
 * Created by linxin on 2017/3/22.
 */
import chooseP from './choosePages.vue'
import {peacemaker} from './delivery'
var ChoosePages = {};
ChoosePages.install = function (Vue,options) {
    Vue.prototype.$choosePages = (id,cb,op) => {
      for(let property in op){
        peacemaker.data[property] = op[property];
      }
      let choosePages = Vue.extend(chooseP);
      let tpl = new choosePages().$mount().$el;
      document.getElementById(id).appendChild(tpl);
      console.log(cb)
      peacemaker.doThings = cb;
    }
}
export default ChoosePages;
