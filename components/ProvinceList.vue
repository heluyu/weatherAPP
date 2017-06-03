<template>
  <div class="province">
      <ul class="list-group">
      <li class="list-group-item active text-center">省份</li>
        <li v-for="province in provinceList"  class="list-group-item"  >
            <a href="#" style="color:#666" class="text-default" v-link="{path: '/citylist/' + province.s}">{{province.n}}</a>
        </li>
      </ul>
  </div>
</template>

<script>
import province from '../js/province.js';
export default {
  data () {
    return {
      provinceList:province
    }
  }
}
</script>
<style>
li{
  font-size: 16px;
  font-weight: bold;
} 
</style>