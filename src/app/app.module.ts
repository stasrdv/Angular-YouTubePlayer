import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [SharedModule, FeaturesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
