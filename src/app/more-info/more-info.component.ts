import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData 
  {
    "coord": {
      "lon": -0.13,
      "lat": 51.51
    },
    "weather": [
      {
        "id": 300,
        "main": "Drizzle",
        "description": "light intensity drizzle",
        "icon": "09d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 280.32,
      "pressure": 1012,
      "humidity": 81,
      "temp_min": 279.15,
      "temp_max": 281.15
    },
    "visibility": 10000,
    "wind": {
      "speed": 4.1,
      "deg": 80
    },
    "clouds": {
      "all": 90
    },
    "dt": 1485789600,
    "sys": {
      "type": 1,
      "id": 5091,
      "message": 0.0103,
      "country": "GB",
      "sunrise": 1485762037,
      "sunset": 1485794875
    },
    "id": 2643743,
    "name": "London",
    "cod": 200
  }

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private datePipe: DatePipe) {}
  weatherDescription:any='';
  sunSet:any='';
  sunRise:any='';
  visibility:any='';
  cityName:any='';
  ngOnInit(): void {
    debugger;
    console.log(this.data);
    this.weatherDescription=this.data.weather[0].description;
    this.sunRise = this.datePipe.transform(new Date(this.data.sys.sunrise * 1000), 'medium');
    console.log('Sunrise '+this.sunRise);
    //this.sunRise=(this.data.sys.sunrise);
    this.sunSet= this.datePipe.transform(new Date(this.data.sys.sunset * 1000), 'medium');
    this.visibility=this.data.visibility;
    this.cityName=this.data.name;
  }
}
