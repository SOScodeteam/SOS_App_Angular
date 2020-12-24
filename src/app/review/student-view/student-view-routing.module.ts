import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { StudentViewPage } from '../student-view/student-view.page'; 

const routes: Routes = [
    {
        path: '', 
        component: StudentViewPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentViewPageRoutingModule {}