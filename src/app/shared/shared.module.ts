import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    MatInputModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
