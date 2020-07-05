<template>
  <div class="slide" >
       <div class="s_tj">
             <div class="s_dtkTit">统计信息</div>
             <div class="sdtkItem">科目名称：历史上</div>
             <div class="sdtkItem">单元：1,2,3,4</div>
             <div class="sdtkItem">开始时间：2020-06-15 15:30:28</div>
             <div class="sdtkItem">题目数量：100</div>
             <div class="sdtkItem">已答：100</div>
             <div class="sdtkItem s_gr">正确：100</div>
             <div class="sdtkItem s_red">错误：0</div>
             <div class="sdtkItem">未答：0</div>
        </div>
        <div class="s_dtk">
             <div class="s_dtkTit">答题卡</div>
             <div class="dtkTip">
                 <div class="dtkTip_item">
                     <div class="dtkTip_item_box s_grb"></div>
                     正确
                 </div>
                 <div class="dtkTip_item ">
                     <div class="dtkTip_item_box s_redb"></div>
                     错误
                 </div>
                 <div class="dtkTip_item">
                     <div class="dtkTip_item_box s_blb"></div>
                     未做
                 </div>
             </div>
             <div class="dtkBox">
                 <div class="dtkTitem s_blb" v-for="item in 100">1</div>
             </div>
        </div>
  </div>
</template>

<script>
export default {
   name:"slideRecord"
}
</script>

<style scoped>
.slide{
    width: 100%;
}
.s_tj{
    font-size: 14px;
    margin-bottom: 20px;
}
.s_dtkTit{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
.s_red{
    color:#F56C6C
}
.s_gr{
    color: #67C23A;
}
.s_grb{
    background:#67C23A ;
}
.s_redb{
    background:#F56C6C
}
.s_blb{
    background: #fff;
    border: 1px solid #999;
}
.dtkTip{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}
.dtkTip_item{
    display: flex;
    align-items: center;
}
.dtkTip_item_box{
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.dtkBox{
    display: flex;
    flex-wrap: wrap;
}
.dtkTitem{
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    margin: 5px;
    font-size: 12px;
}
</style>