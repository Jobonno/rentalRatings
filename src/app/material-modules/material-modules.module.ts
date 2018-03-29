import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatToolbarModule, MatSidenavModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatToolbarModule, MatSidenavModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatToolbarModule, MatSidenavModule],
})
export class MaterialModulesModule { }
