import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MoreInfoComponent } from './more-info/more-info.component';
import { MatDialog } from '@angular/material/dialog';
interface CityList {
  Value: string;
  Name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  city: any;
  value: any;
  constructor(private http: HttpClient,private dialog:MatDialog) { }

  title = 'WeatherApp';
  fullUrl: any = "";
  apiKey: any = 'e32cdeeca9b8eae4b9143aad1844f267';
  selectedCity: any = '';
  latitude: any = '';
  WeatherDtls: any = [];
  iconUrl: any = '';
  temperature: any = '';
  feelsLike: any = '';
  weatherDescription: any = '';
  windSpeed: any = '';
  humidity: any = '';
  rainChance: any = '';
  getCity: any = '';
  currentDate: any = new Date();
  cities: CityList[] = [
    // { Value: "0", Name: "Select City" },
    { Value: "1", Name: "Mumbai" },
    { Value: "2", Name: "Dubai" },
    { Value: "3", Name: "Singapore" },
    { Value: "4", Name: "Moscow" },
    { Value: "5", Name: "Reykjavik" }
  ];
  isDay: boolean = false;
  ngOnInit() {
    //this.getWeatherDtl('Mumbai');
  }

  getWeatherDtl(cityName: string) {
    //this.fullUrl="https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=e32cdeeca9b8eae4b9143aad1844f267";
    this.fullUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + this.apiKey + "&units=metric";
    this.http.get(this.fullUrl).subscribe((data: any) => {
      debugger;
      console.log('Data' + data);
      this.iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      console.log('iconUrl :-' + this.iconUrl);
      console.log('currentDate :-' + this.currentDate);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;

      // Determine if it's day or night
      this.isDay = currentTime >= sunrise && currentTime < sunset;
      console.log('isDay :-' + this.isDay);
      if (this.isDay == false) {
        this.sunClass = '';
      } else {
        this.sunClass = 'active';
      }
      this.WeatherDtls = data;
      this.weatherDescription = data.weather[0].description;
      this.temperature = data.main.temp;
      this.feelsLike = data.main.temp_max;
      this.windSpeed = data.wind.speed;
      this.humidity = data.main.humidity;
      this.rainChance = data.clouds.all;
      this.getCity = data.name+','+data.sys.country;
    });
  }

  moonClass: any = '';
  sunClass: any = 'active';
  toggleTheme() {

  }
  onChangeCity(event:any) {
    debugger;
    //event.target.value;
    this.getWeatherDtl(event.target.value)
  }
  onClickMore(){

  }
  openDialog() {
    this.dialog.open(MoreInfoComponent, {
      data: this.WeatherDtls
    });
  }
}
