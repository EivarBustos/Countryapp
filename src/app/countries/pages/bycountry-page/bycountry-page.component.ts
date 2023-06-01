import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-bycountry-page',
  templateUrl: './bycountry-page.component.html',
  styles: [
  ]
})
export class BycountryPageComponent implements OnInit {

  public countries: Country[]=[];
  public initialValue:string=''

  constructor(private countriServie: CountriesService){}

  ngOnInit(): void {
    this.countries=this.countriServie.cacheStore.byCountries.countries;
    this.initialValue=this.countriServie.cacheStore.byCountries.term;

  }

   searchByCountry(term:string):void{
   this.countriServie.searchCountry(term)
  .subscribe(countries=>{
   this.countries=countries;
 })

 }

}
