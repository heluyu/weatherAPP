import ProvinceList from './components/ProvinceList.vue';
import CityList from './components/CityList.vue';
import County from './components/County.vue';
import Weather from './components/Weather.vue';
// import CurrentWeather from './components/CurrentWeather.vue';



export default{
    '/provincelist':{
        name:'province',
        component :ProvinceList
    },
    '/citylist/:provinceName':{
        name:'city',
        component:CityList
    },
    '/county/:cityName':{
        name:'county',
        component:County
    },
    '/weather/:countyName':{
        name:'weather', 
        component:Weather
    }
}