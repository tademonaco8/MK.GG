import { Component, ComponentFactoryResolver } from "@angular/core";
import { RGService } from '../index/services/rg.service';

interface Partida { 
    summonerNames1 : any [],
    championsNames1 : any [],
    summonerNames2 : any [],
    championsNames2 : any []
}   

@Component({
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css'],
    selector: "match"
})

export class matchComponente {
    public summs1 :string []= [];
    public summs2 :string []= [];
    public champs1 :string []= [];
    public champs2 :string []= [];
    constructor( private RGService : RGService) {}
    partidaInformacion : Partida = {
        summonerNames1 : [this.RGService.infoSumms],
        championsNames1 : [this.RGService.infoChamps],
        summonerNames2 : [this.RGService.infoSumms2],
        championsNames2 : [this.RGService.infoChamps2]
    }
    


    mostrarInfo(){
        this.summs1 = [];
        this.summs2 = [];
        this.champs1 = [];
        this.champs2 = [];
        for (let i = 0; i < 5; i++) {
            const champ1 = this.RGService.infoChamps[0];
            const champ2 = this.RGService.infoChamps2[0];
            const summ1 = this.RGService.infoSumms[0];
            const summ2 = this.RGService.infoSumms2[0];
            this.summs1.push(summ1[i]);
            this.summs2.push(summ2[i]);
            this.champs1.push(champ1[i]);
            this.champs2.push(champ2[i]);
            console.log(champ1[i]+'-'+ summ1[i]);
            console.log(champ2[i]+'-'+ summ2[i]);
            console.log(this.champs1);
            console.log(this.champs2);
            console.log(this.summs1);
            console.log(this.summs2);
            
        }
        
    }
    get champs() {
        return [this.RGService.infoChamps]
    }

    get summs() {
        return [this.RGService.infoSumms]
    }
    
}