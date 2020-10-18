import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin/lessons',
    loadChildren: () => import('./lessons/lessons.module').then( m => m.LessonsPageModule),
    //canActivate: [AuthGuard]
  },

  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'admin/flights',
    loadChildren: () => import('./flights/flights.module').then( m => m.FlightsPageModule)
  },
  {
    path: 'admin/classes',
    loadChildren: () => import('./classes/classes.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'admin/instructors',
    loadChildren: () => import('./instructors/instructors.module').then( m => m.InstructorsPageModule)
  },
  {
    path: 'admin/review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
