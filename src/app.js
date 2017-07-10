import $ from 'jquery'; 
import {fleet} from './fleet-data.js';
import {FleetDataService} from './services/fleet-data-service.js';
import {ApplicationBase} from './framework/application-base.js';

export class App extends ApplicationBase {

  constructor() {
    super('Fleet Manager'); 
    this.dataService = new FleetDataService(); 
    this.dataService.loadData(fleet); 

    this.addRoute('Home', null, true); 
    this.addRoute('Cars', null); 
    this.addRoute('Drones', null); 
    this.addRoute('Map', null); 

  }
}

// instantiating this class as the basis for the whole ap
// this process is called bootstrapping 
export let application = new App(); 
application.show($('body')); 
