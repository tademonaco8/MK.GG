import { Injectable } from "@angular/core";
import { IndexComponente } from '../index.component';

@Injectable ({
    providedIn : 'root'
})

export class RGService {
    private apiKey : string = 'RGAPI-23f13ac0-30a3-4374-ba8a-c3c69a114763';
    private _busquedas: string [] = [];

    get busquedas(){
        return [...this._busquedas];
    }
    
    public puuid : string = '';
    public level : number = 0;
    public SummName : string = '';
    public accountID : string = '';
    public id : string = '';
    public matches: string [] = [];

    buscarInvocador ( query: string ){
        query = query.trim().toLocaleLowerCase();
        fetch (`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${this.apiKey}`)
        .then( resp => {
            resp.json().then(data=> {
                this.SummName = data.name;
                this.level = data.summonerLevel;
                this.puuid = data.puuid;
                this.accountID = data.accountId;
                this.id = data.id;
                this.buscarPartidas(this.puuid);
            })
        })
    }

    buscarPartidas (puuid : string){
        fetch (`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${this.apiKey}`)
        .then(resp => {
            resp.json().then(datos=> {
                let arrMatches : string []= [];
                datos.forEach((dato: string) => {
                    arrMatches.push(dato);
                    this.infoPartidas(dato);
                });
                this.matches = arrMatches;
            })
        })
    }

    buscarNombrePuuID( puuID : string){
        fetch (`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuID}?api_key=${this.apiKey}`)
        .then(resp => {
            let arrMatch: string[] = [];
            resp.json().then(datos=>
                arrMatch.push(datos.name) 
                )
            console.log(arrMatch);
        })
    }


    infoPartidas (matchID : string){
            fetch (`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${this.apiKey}`)
            .then(resp => {
                resp.json().then(datos => {
                    for (let i = 0; i < 10; i++) {
                        const PuuID = datos.metadata.participants[i];
                        this.buscarNombrePuuID(PuuID);
                    }
                    // console.log(datos.metadata.participants);
                })
        })
    }
}
