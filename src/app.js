import {Car} from './classes/car.js';
import {Drone} from './classes/drone.js';
import {fleet} from './fleet-data.js';
import {FleetDataService} from './services/fleet-data-service.js';

let dataService = new FleetDataService(); 
dataService.loadData(fleet); 

// let car = dataService.getCarByLicense('AT2000');

// let cars = dataService.getCarsSortedByLicense(); 

let cars = dataService.filterCarsByMake('y');

for (let car of cars) {
  console.log(car.make);
}

