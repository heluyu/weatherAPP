<template>
<div class="city">
      <ul class="list-group">
      <li class="list-group-item active text-center">城市</li>
        <li v-for="city in myCity | filterBy provName"  class="list-group-item"  >
            <a href="#" style="color:#666" class="text-default" v-link="{path: '/county/'+ city.cityEn}" >{{city.cityZh}}</a>
        </li>
      </ul>
  </div>
</template>
<script>

import city from '../js/citieslatlon.js';

export default{
    data(){
        return{
            CityList:city,
            provName:this.$route.params.provinceName,
            myCity:[]
        }
    },
    methods:{
        getCityList(){
            var that = this;
            this.CityList.forEach(function(val,key,arr){
                if(val.cityEn == val.leaderEn){
                    that.myCity.push(that.CityList[key]);
                }
            })
        }
    },
    created : function(){
        this.getCityList();
    }
}
    
</script>