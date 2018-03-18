import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule],
})
export class MaterialModulesModule { }
