<template>
   <div>
      <NewHeader></NewHeader>
      <SlideNav></SlideNav>  
       <router-view></router-view>
      <CommonFooter></CommonFooter>
   </div>
</template>

<script>
import "@/assets/css/home.css";
import "@/assets/css/iconFont.css";
import NewHeader from "@/components/NewHeader.vue"
import CommonFooter from "@/components/CommonFooter.vue"
import SlideNav from "@/components/SlideNav.vue"
export default {
  name: "home",
  components:{
      NewHeader,
      SlideNav,
      CommonFooter,
  },
  computed: {
    getWinHeight: function() {
      return this.$winHeight;
    }
  },
  data() {
    return {
       
    };
  },
  methods: {},
  mounted() {
     
  }
};
</script>

<style scoped>

</style>
