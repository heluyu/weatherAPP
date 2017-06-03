<template>
    <div class="city">
      <span v-for="val in countyInfo">{{val.cityZh}}天气预报</span>
      <ul>
        <li v-for="weather in weatherList" >
            {{weather.morning}}
        </li>
      </ul>
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
                weatherList:null,
                filter:1
            }
        },
        props:['filterType'],
        events:{
            refresh:function(data){
            if (data == this.filterType) {
                this.getSevenDayWeather();
            }
            }
        },
        watch: {
            'filterType': function(val) {
                if (val == this.filter) {
                    this.getSevenDayWeather();
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
            getSevenDayWeather(){
                // console.log(this.countyInfo)
                var countyInfo = this.countyInfo[0];
        
                this.$http.get('http://api.openweathermap.org/data/2.5/weather?lat='+countyInfo.lat+'&lon='+countyInfo.lon+'&lang=zh_cn&appid=613b47c5a51043bd451b4c924f240fb5').then((response) =>{
                    // console.log( response.data );
                    this.weatherInfo = response.data;
                    this.operationData(response.data && response.data.list);
                    // console.log(response.data.list)
                },(response) =>{
                    console.log( 'error' );
                });
            },
            operationData(list){
                var weatherList = [];
                for (var i = 0; i < 7; i++) {
                var morning = list[i];
                var morningDesc ="时间:" + morning.dt_txt + " " + morning.weather[0].description + " 温度:" + Math.ceil(morning.main.temp - 273.15) + "度 湿度:" + morning.main.humidity + " 风力:" + Math.ceil(morning.wind.speed) + "级";
                var weather = {
                    "morning":morningDesc,
                    //"night":nightDesc
                }
                weatherList.push(weather);
                }
                this.weatherList = weatherList;
            },
        },
        created : function(){
            this.getCountyInfo();            
            this.getSevenDayWeather();
        }
    }
</script>
<style>
    .weather{padding-left:20px;}
    .deg{font-size:40px; font-weight:700;}
    .temp{position:absoule;}
    .zero{position:relative; left:45px; top:-50px;}
    .desc p{font-size:20px; font-weight:bold;}
    span{font-size:20px; font-weight:700; padding-left:20px;}
</style>