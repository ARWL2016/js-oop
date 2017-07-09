class Drone {
  constructor (id, name) {
    this._id = id; 
    this.name = name;
  }
  id () {
    return this._id; 
  }
     
}

let drone = new Drone(5, 'Tom');



console.log(drone.id());