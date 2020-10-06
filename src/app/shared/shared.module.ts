import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  
  imports: [
    CommonModule, 
    IonicModule
  ],
  exports: [ProfileComponent, LoginComponent],
  declarations: [ProfileComponent, LoginComponent]
})

export class SharedModule { }
