import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UrlFormatPipe } from './pipes/url-format.pipe';
import { CoreModule } from '../core/core.module';







@NgModule({
  declarations: [UrlFormatPipe],
  imports: [
    CommonModule, BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, MatAutocompleteModule, MatFormFieldModule, FormsModule, MatInputModule, MatListModule,
    NgxYoutubePlayerModule, MatButtonModule, CoreModule, MatToolbarModule
  ],
  exports: [CommonModule, BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, MatAutocompleteModule, MatFormFieldModule, FormsModule, MatInputModule, MatListModule,
    NgxYoutubePlayerModule, MatButtonModule, UrlFormatPipe, CoreModule, MatToolbarModule]
})
export class SharedModule { }
