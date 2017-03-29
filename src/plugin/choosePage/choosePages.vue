<template>
  <div class="choosePages">
    <a href="javascript:;" class="firstPage" @click="toFirst">首页</a><a
    href="javascript:;" class="last" @click="chooseBtnLast"><i></i></a><a
    href="javascript:;"v-for="item in showBtns" :class="{pageNum : chooseBtnIndex === item }" @click="clickBtn(item)">{{item}}</a><a
    href="javascript:;" class="next" @click="chooseBtnNext"><i></i></a><a
    href="javascript:;" class="lastPage" @click="toLast">尾页</a><span
    class="hint" v-if="isShowRight">跳转到</span><input type="text" v-model="pageIndex" @keyup="goIndex" v-if="isShowRight"><span
    v-if="isShowRight">页</span><span v-if="isShowRight">共{{btns.length}}页</span>
  </div>
</template>
<script>
  import {peacemaker} from './delivery'
    export default {
    data(){
      return {
         btns : [],
         showBtns : [],
         chooseBtnIndex :1, //页码
         overNum:0,
         pageIndex:'1',
      }
    },
    created() {
       this.createBtns(this.listsNum);
    },
    computed: {
      listsNum:function () {
        return  peacemaker.data.listsNum
      },
      //每页展示的内容列表个数
      itemsNum:function () {
        return  peacemaker.data.itemsNum
      },
      //页面最多展示的个数
      lengthBtns: function () {
        return peacemaker.data.btnNum
      },
      isShowRight:function () {
        return this.btns.length > this.lengthBtns ? true : false;
      }
    },
    methods: {
      //跳转页面
       goIndex(e){
         if(e.keyCode !== 13 || +this.pageIndex > this.btns.length){
           return;
         }
         console.log(this.pageIndex)

         this.chooseBtnIndex = +this.pageIndex;
         this.getPageMessage ();
         if(+this.pageIndex > this.lengthBtns){ //选择的页面大于显示个数限制
           this.overNum = +this.pageIndex - this.lengthBtns;
           this.showBtns = null;
           this.showBtns = this.btns.slice(this.overNum,this.lengthBtns+this.overNum);
         }else{
           this.overNum=0;
           this.showBtns = null;
           this.showBtns = this.btns.slice(this.overNum,this.lengthBtns+this.overNum);
         }
       },
      //5个列表为一页
       createBtns(n){
         let length = 0;
         if(n>this.itemsNum){
           length = parseInt(n/this.itemsNum);
           if(parseInt(n%this.itemsNum)>0){
             length = length + 1;
           }
           for(let i=0;i<length;i++){
             this.btns.push(i+1);
           }
           if(this.btns.length>this.lengthBtns){ //按钮长度不能大于长度设定值
             this.showBtns = null;
             this.showBtns = this.btns.slice(0,this.lengthBtns);
           }else{
             this.showBtns = null;
             this.showBtns = this.btns;
           }

         }else {
           return;
         }
       },
        getPageMessage (){
           //请求选择的页面信息
           console.log( '请求的第页:'+this.chooseBtnIndex);
           //this.getNextPage(this.chooseBtnIndex);
          peacemaker.doThings(this.chooseBtnIndex);
        },
       clickBtn(index){
         this.chooseBtnIndex = index;
         this.getPageMessage ();
       },
      chooseBtnLast(){  //前一个按钮
         if(this.chooseBtnIndex === 1){
           return
         }
         this.chooseBtnIndex--;
         this.getPageMessage ();
         if(this.overNum>0){ //按钮长度不能大于长度设定值
            this.overNum--;
           if(this.overNum < 0){
             return
           }
            this.showBtns = null;
            this.showBtns = this.btns.slice(this.overNum,this.lengthBtns+this.overNum);
         }
      },
      chooseBtnNext(){  //后一个按钮  向后移动
        if(this.chooseBtnIndex === this.btns.length){
          return
        }
        this.chooseBtnIndex++;
        this.getPageMessage ();
        if(this.chooseBtnIndex>this.lengthBtns){ //按钮长度不能大于长度设定值
          this.overNum++;
          this.showBtns = null;
          this.showBtns = this.btns.slice(this.overNum,this.lengthBtns+this.overNum);
        }
      },
      toFirst(){
        if(this.chooseBtnIndex === 1){
          return
        }
        this.chooseBtnIndex=1;
        this.getPageMessage ();
        if(this.overNum>0){ //按钮长度不能大于长度设定值
          this.overNum=0;
          this.showBtns = null;
          this.showBtns = this.btns.slice(this.overNum,this.lengthBtns+this.overNum);
        }
      },
      toLast(){
        if(this.chooseBtnIndex === this.btns.length){
          return
        }
        this.chooseBtnIndex=this.btns.length;
        this.getPageMessage ();
        if(this.btns.length>this.lengthBtns){ //按钮长度不能大于长度设定值
          this.overNum = this.btns.length - this.lengthBtns;
          this.showBtns = null;
          this.showBtns = this.btns.slice(this.overNum,this.lengthBtns+this.overNum);
        }
      }
    },
  }
</script>

<style scoped lang="css">
  .choosePages{
    text-align: center;
    margin: 34px 0;
  }
  .choosePages a{
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #999;
    margin-right: 10px;
    color:#333;
    background: #fff;
    font-size: 13px;
  }
  .choosePages a i{
    display: inline-block;
    width: 10px;
    height: 12px;
  }
  .choosePages .last i{
    background: url("./icon/icon_last@2x.png") no-repeat 0 0;
    background-size: 10px 12px;
  }
  .choosePages .last:hover{
    background: rgba(200,200,200,.2);
  }
  .choosePages .next i{
    background: url("./icon/icon_next@2x.png") no-repeat 0 0;
    background-size: 10px 12px;
  }
  .choosePages  .next:hover{
    background: rgba(200,200,200,.2);
  }
  .choosePages .pageNum{
    background: #000;
    border: 1px solid #000;
    color: #fff;
  }
  .choosePages .firstPage,.choosePages .lastPage{
    width: 45px;
  }
   .choosePages .firstPage:hover,.choosePages .lastPage:hover{
     background: #f2f2f2;
     border: 1px solid #666;
   }
  .choosePages .lastPage{
    margin-right: 0;
  }
  .choosePages span{
    color:#333;
    font-size: 13px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .choosePages .hint{
    margin-left: 15px;
  }
  .choosePages input{
    width: 26px;
    text-align: center;
  }
</style>

