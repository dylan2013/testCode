import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BehaviorRoutingModule } from './behavior-routing.module';
import { AppComponent } from './behavior.component';

import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { CommentComponent } from './comment/comment.component';

import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BehaviorRoutingModule,
    MatFormFieldModule,
  ],
  declarations: [
    AppComponent,
    MainComponent,
    AddComponent,
    ListComponent,
    CommentComponent,
  ],
  entryComponents: [
  ]
})
export class BehaviorModule { }
