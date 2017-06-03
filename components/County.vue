<template>
    <div class="city">
      <ul class="list-group">
      <li class="list-group-item active text-center">县</li>
        <li v-for="county in myCounty | filterBy provName"  class="list-group-item"  >
            <a href="#" style="color:#666" class="text-default" v-link="{path: '/weather/'+ county.cityEn}" >{{county.cityZh}}</a>
        </li>
      </ul>
  </div>

</template>

<script>

import county from '../js/citieslatlon.js';
export default{
    data(){
        return{
            Countylist:county,
            countyName:this.$route.params.cityName,
            myCounty:[]
        }
    },
    methods:{
        getCountyList(){
            var that = this;
            this.Countylist.forEach(function(val,key,arr){
                if(val.leaderEn == that.countyName){
                    that.myCounty.push(that.Countylist[key]);
                }
            })
        }
    },
    created : function(){
        this.getCountyList();
    }

}


</script>