import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IndexComponente } from 'src/index/index.component';
import { matchComponente } from '../match/match.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponente } from '../search/search.component';
import { summonerComponente } from '../summoner/summoner.component';

@NgModule({
  declarations: [
    IndexComponente,
    AppComponent,
    matchComponente,
    SearchComponente,
    summonerComponente
  ],
  imports: [
    BrowserModule,
    FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
