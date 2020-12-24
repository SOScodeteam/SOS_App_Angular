import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentViewPageRoutingModule } from './student-view-routing.module'; 

import { StudentViewPage } from './student-view.page'; 


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StudentViewPageRoutingModule
    ],
    declarations: [StudentViewPage]
})
export class StudentViewPageModule {}