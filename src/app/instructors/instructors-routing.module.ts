import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorsPage } from './instructors.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorsPageRoutingModule {}
