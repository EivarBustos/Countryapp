import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,catchError, of , tap, map, delay} from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string='https://restcountries.com/v3.1';

  public cacheStore: CacheStore={

    byCapital:  {term:'', countries:[]},
    byCountries:{term:'', countries:[]},
    byRegion:   {region:'', countries:[]}
  }




  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
   }

   //Guardar en el local storage
   private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))

   }

   private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore=JSON.parse(localStorage.getItem('cacheStore')!);

   }

  private getCountiresRequest (url:string): Observable<Country []>{
    return this.httpClient.get<Country[]>(url)
     //cuando se escriba algo que no este sacar mensaje
    .pipe(
      catchError(error=>  of([])),
      // delay(2000)
     )
  }

  searchCapital(termi:string):Observable<Country[]>{
    const url =`${this.apiUrl}/capital/${termi}`
    return this.getCountiresRequest(url)
    .pipe(
      tap((countries=> this.cacheStore.byCapital={term: termi, countries:countries})),
      tap(()=>this.saveToLocalStorage())
      )
      // tap(countires => console.log('Paso por el tag', countires)),
      // map(countries=>[]),
      // tap(countires => console.log('Paso por el tag2', countires)),
      //para que se ejecute necesitamos un suscribe
  }


  searchCountry(term:string):Observable<Country[]>{
   const url= `${this.apiUrl}/name/${term}`
   return this.getCountiresRequest(url)
   .pipe(
    tap((countries=>this.cacheStore.byCountries={term: term, countries:countries})),
    tap(()=>this.saveToLocalStorage())
   )
  }


  searchRegion(region:Region):Observable<Country[]>{
    const url= `${this.apiUrl}/region/${region}`
    return this.getCountiresRequest(url)
  .pipe(
    tap((countries=>this.cacheStore.byRegion={region: region, countries:countries})),
    tap(()=>this.saveToLocalStorage())
  )}


  searchCountryByAlphaCode(code:string):Observable<Country| null>{
    const url= `${this.apiUrl}/alpha/${code}`
    return this.httpClient.get<Country[]>(url)
    .pipe(
      map(countries=> countries.length>0 ?countries[0] :null),
      catchError(error=>  of(null))
    )}
}
