import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page/landing-page.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'visualization',
    },
    {
        path: 'visualization',
        component: LandingPageComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
