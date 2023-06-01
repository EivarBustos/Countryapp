import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByCapitalsPageComponent } from './pages/by-capitals-page/by-capitals-page.component';
import { BycountryPageComponent } from './pages/bycountry-page/bycountry-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountriesRoutingModule } from './countries-rounting.module';
import { SharedModule } from '../shared/shared.module';
import { CountryTableComponent } from './components/country-table/country-table.component';



@NgModule({
  declarations: [
   ByCapitalsPageComponent,
   BycountryPageComponent,
   ByRegionPageComponent,
   CountryPageComponent,
   CountryTableComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule

  ]
})
export class CountriesModule { }
