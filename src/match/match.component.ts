import { Component } from "@angular/core";
import { RGService } from '../index/services/rg.service';

interface Partida { 
    summonerNames1 : any [],
    championsNames1 : any [],
    summonerNames2 : any [],
    championsNames2 : any [],
    gameMode : string,
    gameLength : number,
    gameId : string
}   
interface Team {
    summs : string [],
    champs : string [],
    win: boolean,
    team : number,
    kills : number [],
    deaths : number [],
    assists : number []
}
interface Summoner {
    name : string,
    champ?: string,
    kills?: number,
    deaths?: number,
    assists?: number,
}
@Component({
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css'],
    selector: "match"
})
export class matchComponente {
    constructor( private RGService : RGService) {}
    partidaInformacion : Partida = {
        summonerNames1 : [this.RGService.infoSumms],
        championsNames1 : [this.RGService.infoChamps],
        summonerNames2 : [this.RGService.infoSumms2],
        championsNames2 : [this.RGService.infoChamps2],
        gameMode : this.RGService.gameMode,
        gameLength : this.RGService.gameLength,
        gameId: this.RGService.gameId
    }
    team1 : Team = {
        summs :  [],
        champs : [],
        win: false,
        team : 0,
        kills : [],
        deaths : [],
        assists : []
    }
    team2 : Team = {
        summs :  [],
        champs : [],
        win: false,
        team : 0,
        kills : [],
        deaths : [],
        assists : []
    }

    public vaciarObj() {
        this.team1.summs = [];
        this.team1.champs = [];
        this.team1.team = 0;
        this.team1.win = false;
        this.team1.kills = [];
        this.team1.deaths = [];
        this.team1.assists = [];
        this.team2.summs = [];
        this.team2.champs = [];
        this.team2.team = 0;
        this.team2.win = false;
        this.team2.kills = [];
        this.team2.deaths = [];
        this.team2.assists = [];
    }

    public mostrarInfo(): void{        
        this.vaciarObj();
        for (let i = 0; i < 5; i++) {
            const champ1 = this.RGService.infoChamps[0];
            const champ2 = this.RGService.infoChamps2[0];
            const summ1 = this.RGService.infoSumms[0];
            const summ2 = this.RGService.infoSumms2[0];
            this.team1.summs.push(summ1[i]);
            this.team2.summs.push(summ2[i]);
            this.team1.champs.push(champ1[i]);
            this.team2.champs.push(champ2[i]);
            this.team1.win = this.RGService.wint1;
            this.team2.win = this.RGService.wint2;
            this.team1.kills = this.RGService.kt1;
            this.team2.kills = this.RGService.kt2;
            this.team1.deaths = this.RGService.dt1;
            this.team2.deaths = this.RGService.dt2;
            this.team1.assists = this.RGService.at1;
            this.team2.assists = this.RGService.at2;
        }
        
    }
    get champs() {
        return [this.RGService.infoChamps]
    }

    get summs() {
        return [this.RGService.infoSumms]
    }
    
}