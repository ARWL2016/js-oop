import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import {DataError} from './data-error.js';

export class FleetDataService {

  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  getCarByLicense(license) {
    return this.cars.find(car => {
      return car.license === license;
    });
  }

  getCarsSortedByLicense() {
    return this.cars.sort((car1, car2) => {
      return car1.license < car2.license;
    })
  }

  filterCarsByMake(query) {
    return this.cars.filter(car => {
      return car.make.indexOf(query) >= 0;
    })
  }


  loadData(fleet) {
    for (let data of fleet) {
      switch(data.type) {
        case 'car': 
        if (this.validateCarData(data)) {
            let car = this.loadCar(data);
            if (car) {
              this.cars.push(car);   
            }
        } else {
          let e = new DataError('Invalid data', data);
          this.errors.push(e); 
        }
        break; 
        case 'drone':
          let drone = new Drone(data.license, data.model, data.latLong);
          drone.airTimeHours = data.airTimeHours; 
          drone.base = data.base;
            this.drones.push(drone); 
          break; 
        default: 
          let e = new DataError('Invalid vehicle type', data); 
          this.errors.push(e); 
          break;
      }
    }
  }

  loadCar(car) {
    try {
      let c = new Car(car.license, car.model, car.latLong); 
      c.miles = car.miles; 
      c.make = car.make; 
      return c; 
    } catch (e) {
      this.errors.push(new DataError('error loading car', car))
    }
    return null; 
  }

  validateCarData(car) {
    let requiredProps = 'license model latLong miles make'.split(' ');
    let hasErrors = false; 
    for (let field of requiredProps) {
      if(!car[field]) {
        let e = new DataError(`Missing ${field} field `, car);
        this.errors.push(e);
        this.hasErrors = true; 
      }
    }
    if (Number.isNaN(Number.parseFloat(car.miles))) {
      this.errors.push(new DataError('invalid mileage', car));
      hasErrors = true; 
    }
    return !hasErrors; 
  }




}