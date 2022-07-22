import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})


export class RGService {


    private apiKey: string = 'RGAPI-fd4c72e5-8bfe-4ab1-9081-d5bb9a1c9faa';
    private _busquedas: string[] = [];

    get busquedas() {
        return [...this._busquedas];
    }
    //summonerDTO
    public puuid: string = '';
    public gameLength: number = 0;
    public level: number = 0;
    public SummName: string = '';
    public SummChamp: string = '';
    public matches: string[] = [];
    public infoSumms: any[] = [];
    public infoChamps: any[] = [];
    public infoSumms2: any[] = [];
    public infoChamps2: any[] = [];
    public gameMode: string = '';
    public wint1: boolean = false;
    public wint2: boolean = false;
    public kt1: number[] = [];
    public kt2: number[] = [];
    public dt1: number[] = [];
    public dt2: number[] = [];
    public at1: number[] = [];
    public at2: number[] = [];
    public gameId: string = '';
    public dateGame: Date = new Date();

    buscarInvocador(nombre: string) {
        nombre = nombre.trim().toLocaleLowerCase();
        fetch(`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nombre}?api_key=${this.apiKey}`)
            .then(resp => {
                resp.json().then(data => {
                    this.SummName = data.name;
                    this.level = data.summonerLevel;
                    this.puuid = data.puuid;
                    // this.accountID = data.accountId;
                    // this.id = data.id;
                    this.buscarPartidas(this.puuid);
                })
            })
    }

    buscarPartidas(puuid: string) {
        fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${this.apiKey}`)
            .then(resp => {
                resp.json().then(datos => {
                    let arrMatches: string[] = [];
                    datos.forEach((dato: string) => {
                        arrMatches.push(dato);
                        
                    });
                    this.matches = arrMatches;
                })
            })
    }

    vaciarDatos() {
        this.infoSumms = [];
        this.infoSumms2 = [];
        this.infoChamps = [];
        this.infoChamps2 = [];
        this.SummChamp = '';
        this.kt1 = [];
        this.kt2 = [];
        this.dt1 = [];
        this.dt2 = [];
        this.at1 = [];
        this.gameLength = 0;
        this.at2 = [];
    }

    infoPartidas(matchID: string) {
        this.vaciarDatos();
        const team1: any[] = [];
        const team1Champs: any[] = [];
        const team2: any[] = [];
        const team2Champs: any[] = [];
        fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${this.apiKey}`)
            .then(resp => {
                resp.json().then(datos => {
                    for (let i = 0; i < 10; i++) {
                        //team 1 info
                        if (datos.info.participants[i].teamId === 100) {
                            team1.push(datos.info.participants[i].summonerName);
                            team1Champs.push(datos.info.participants[i].championName);
                            this.gameMode = datos.info.gameMode;
                            this.wint1 = datos.info.teams[0].win;
                            this.kt1.push(datos.info.participants[i].kills)
                            this.dt1.push(datos.info.participants[i].deaths)
                            this.at1.push(datos.info.participants[i].assists)
                         //team 2 info
                        } else if (datos.info.participants[i].teamId === 200) {
                            team2.push(datos.info.participants[i].summonerName);
                            team2Champs.push(datos.info.participants[i].championName);
                            this.wint2 = datos.info.teams[1].win;
                            this.kt2.push(datos.info.participants[i].kills)
                            this.dt2.push(datos.info.participants[i].deaths)
                            this.at2.push(datos.info.participants[i].assists)
                        }
                    }
                    this.gameLength = datos.info.gameDuration;
                    this.infoSumms.push(team1);
                    this.infoSumms2.push(team2);
                    this.infoChamps.push(team1Champs);
                    this.infoChamps2.push(team2Champs);
                })
            })
    }
}
