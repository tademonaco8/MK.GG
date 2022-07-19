import { Component } from "@angular/core";
import { RGService } from './services/rg.service';
import { matchComponente } from '../match/match.component';
interface Busqueda {
    nombreInv: string,
    region: string,
    fav: boolean
}
interface Summoner {
    summName : string,
    level : number,
    puuid: string,
    accId: string,
    profileIcon: number,
    id: string
}
interface Favs {
    nombreInv: string;
    region: string;
}
interface Partidas {
    IdPartida : string;

}

@Component({
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    selector: "main"
})

export class IndexComponente {
    
    constructor( private RGService : RGService) {
    }

    title = 'MONAK.GG';
    favoritos: Favs[] = [
        {
            nombreInv : 'TMonak',
            region : 'la2'
        }
    ];
    partidas: Partidas[] = [];
    busqueda: Busqueda = {
        nombreInv: '',
        region: 'la2',
        fav: false
    };

    summoner : Summoner = {
        summName : '',
        level : 0,
        puuid : '',
        accId: '',
        id: '',
        profileIcon: 0
    }

    buscarInv(event : any) {
        if (this.busqueda.nombreInv.trim().length === 0) {
            return;
        }
        console.log(this.busqueda);
        this.busqueda.fav = event.target[2].checked;
        this.agregarInvocadorFav();
        this.RGService.buscarInvocador(this.busqueda.nombreInv);
        this.busqueda = {
            nombreInv : '',
            region : '',
            fav : false
        };
    }

    infoPartidas(matchId :string){
        this.RGService.infoPartidas(matchId);
        console.log(this.RGService.infoChamps);
        console.log(this.RGService.infoSumms);
        return this.RGService.infoChamps;
        
    }

    get champs() {
        return [this.RGService.infoChamps]
    }

    get summs() {
        return [this.RGService.infoSumms]
    }
    get champs2() {
        return [this.RGService.infoChamps2]
    }

    get summs2() {
        return [this.RGService.infoSumms2]
    }

    get infoPartida() {
        return [this.RGService.infoChamps]
    }

    get nombreInv() {
        return [this.RGService.SummName]
    }

    get partidasHistorial(){
        return [...this.RGService.matches]
    }

    log(event: any) {
        let checked = event.target.checked;
        this.busqueda.fav = checked;
    }

    copiarDatos(fav : Favs){
        this.busqueda = {
            nombreInv : fav.nombreInv,
            region : fav.region,
            fav : false
        }
        this.RGService.buscarInvocador(this.busqueda.nombreInv);
    }

    agregarInvocadorFav() {
        for (let i = 0; i < this.favoritos.length; i++) {
            const nombreFav = this.favoritos[i].nombreInv;
            if((nombreFav === this.busqueda.nombreInv)&&(this.favoritos[i].region===this.busqueda.region)&&(this.busqueda.fav == true)){
                console.log("El favorito ya existe");
                this.busqueda = {
                    nombreInv : '',
                    region : '',
                    fav : false
                };
                return;
            }
        }
        
        if (this.busqueda.fav === true) {
            this.favoritos.push(this.busqueda);
            this.busqueda = {
                nombreInv : '',
                region : '',
                fav : false
            }
            console.log(this.favoritos);
        }
    }
}

