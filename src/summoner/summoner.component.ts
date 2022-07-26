import { Component } from "@angular/core";

interface Summoner {
    name : string,
    champ?: string,
    kills?: number,
    deaths?: number,
    assists?: number,
}

@Component({
    templateUrl: './summoner.component.html',
    styleUrls: ['./summoner.component.css'],
    selector: "summoner"
})



export class summonerComponente {
    public summ : Summoner = {
        name : '',
        champ : '',
        kills : 0,
        deaths : 0,
        assists : 0
    }


}