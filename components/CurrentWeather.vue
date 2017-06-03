<template>
    <div class="city">
      <div class="weather">
        <h3 v-for="val in countyInfo">{{val.cityZh}}</h3>
        <div class="temp" v-show="weatherInfo">
            <div class="deg">{{temp}}</div><div class="zero">0</div>
        </div>
        <div class="desc" v-show="weatherInfo">
            <p>{{description}}</p>
            <p>{{humidity}}</p>
        </div>
      </div>
  </div>
</template>

<script>
import weather from '../js/citieslatlon.js';

    export default{
        data(){
            return{
                Weather:weather,
                countyInfo:[],
                countyName:this.$route.params.countyName,
                weatherInfo:null,
                temp:null,
                description:null,
                humidity:null,
                filter:0
            }
        },
        props:['filterType'],
        events:{
            refresh:function(data){
            if (data == this.filter) {
                this.getCurrentWeather();
            }
            }
        },
        watch: {
            'filterType': function(val) {
                if (val == 0) {
                    this.getCurrentWeather();
                }
            },
        },
        methods:{
            getCountyInfo(){
                var that = this;
                this.Weather.forEach(function(val,key,arr){
                    if(val.cityEn == that.countyName){
                        that.countyInfo.push(that.Weather[key]);
                    }
                })
                 
            },
            getCurrentWeather(){
                // console.log(this.countyInfo)
                var countyInfo = this.countyInfo[0];
        
                this.$http.get('http://api.openweathermap.org/data/2.5/weather?lat='+countyInfo.lat+'&lon='+countyInfo.lon+'&lang=zh_cn&appid=613b47c5a51043bd451b4c924f240fb5').then((response) =>{
                    // console.log( response.data );
                    this.weatherInfo = response.data;
                    this.operationData();
                },(response) =>{
                    console.log( 'error' );
                });
            },
            operationData(){
                this.temp = Math.ceil(this.weatherInfo.main.temp - 273.15);
                this.description = this.weatherInfo.weather[0].description;
                this.humidity = "湿度" + this.weatherInfo.main.humidity + "%" + " 风力" + Math.ceil(this.weatherInfo.wind.speed) + "级";
            },
        },
        created : function(){
            this.getCountyInfo();            
            this.getCurrentWeather();
        }
    }
</script>
<style>
    .weather{padding-left:20px;}
    .deg{font-size:40px; font-weight:700;}
    .temp{position:absoule;}
    .zero{position:relative; left:45px; top:-50px;}
    .desc p{font-size:20px; font-weight:bold;}
</style>