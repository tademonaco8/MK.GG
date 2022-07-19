import { Injectable } from "@angular/core";
import { matchComponente } from '../../match/match.component';

@Injectable ({
    providedIn : 'root'
})

export class RGService {
    private apiKey : string = 'RGAPI-4eb3779c-7cfc-4497-b9f1-2d77f30e492d';
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
    public infoSumms : any [] = [];
    public infoChamps : any [] = [];
    public infoSumms2 : any [] = [];
    public infoChamps2 : any [] = [];
    public gameMode : string = '';
    public wint1 : boolean = false;
    public wint2 : boolean = false;

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
                    this.infoSumms = [];
                    this.infoSumms2 = [];
                    this.infoChamps = [];
                    this.infoChamps2 = [];
                    const team1: any [] = [];
                    const team1Champs: any [] = [];
                    const team2: any [] = [];
                    const team2Champs: any [] = [];   
                    for (let i = 0; i < 10; i++) {
                        if (datos.info.participants[i].teamId === 100){
                            team1.push(datos.info.participants[i].summonerName);
                            team1Champs.push(datos.info.participants[i].championName);
                            this.gameMode = datos.info.gameMode;
                            this.wint1 = datos.info.teams[0].win;
                            this.wint2 = datos.info.teams[1].win;
                        } else if (datos.info.participants[i].teamId === 200){
                            team2.push(datos.info.participants[i].summonerName);
                            team2Champs.push(datos.info.participants[i].championName);
                        }
                    }
                    console.log(datos.info.gameDuration/60);
                    this.infoSumms.push(team1);
                    this.infoSumms2.push(team2);
                    this.infoChamps.push(team1Champs);
                    this.infoChamps2.push(team2Champs); 
                })
        })
    }
}
