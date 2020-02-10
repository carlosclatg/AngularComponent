# angularComponents

The aim of this project is to generate web components to use in current MyHotel and Admin website.
This is not an Angular entire app, but contains all necessary services, components and dependencies to generate web components.

## generate web component

* ng build --prod --output-hashing=none
* node package_script.js


This will generate a web component.
Please refer to app.module.ts and package_script.js to get the details of the component.

```
export class AppModule { 
  constructor(private injector: Injector){}

  ngDoBootstrap(){
    const customElement= createCustomElement(YourInformationComponent,{injector:this.injector}); // Angular will encapsulate YourInformationComponent
    customElements.define('your-information',customElement); //This will create a component whose tag is "your-information"
  }
}
```


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
