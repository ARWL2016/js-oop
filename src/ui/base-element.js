import $ from 'jquery';

export class BaseElement {

  constructor() {
    this.element = null; // jQuery wrapped object 
  }

  appendToElement(el) {
    this.createElement(); 
    el.append(this.element);
    this.enableJS();
  }

  createElement() {
    let s = this.getElementString(); 
    this.element = $(s); 
  }

  getElementString() {
    throw 'Please override getElementString() in BaseElement';
    // this error tells the dev they must define this method
  }

  enableJS() {
    componentHandler.upgradeElement(this.element[0]);
  }
}

