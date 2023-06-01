import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByCapitalsPageComponent } from './pages/by-capitals-page/by-capitals-page.component';
import { BycountryPageComponent } from './pages/bycountry-page/bycountry-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
const routes:Routes=[
  {
    path:'by-capital',
    component: ByCapitalsPageComponent

  },

  {
    path:'by-country',
    component: BycountryPageComponent

  },

  {
    path:'by-region',
    component: ByRegionPageComponent

  },

  {
    path:'by/:id',
    component: CountryPageComponent

  },
  {
    path: '**',
    redirectTo:'by-capital'
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
  })
export class CountriesRoutingModule { }
