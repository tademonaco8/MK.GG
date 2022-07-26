import { Component } from "@angular/core";
import { RGService } from './services/rg.service';

interface Busqueda {
    nombreInv: string,
    region: string,
    fav: boolean
}
interface Summoner {
    summName: string,
    level: number,
    puuid: string,
    profileIcon: number,
    champion: string
}
export interface Favs {
    nombreInv: string;
    region: string;
}
interface Partidas {
    IdPartida: string;

}

@Component({
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    selector: "main"
})

export class IndexComponente {

    constructor(private RGService: RGService) {
    }

    title = 'MONAK.GG';
    public favoritos: Favs[] = [
        
    ];
    partidas: Partidas[] = [];
    busqueda: Busqueda = {
        nombreInv: '',
        region: 'la2',
        fav: false
    };

    summoner: Summoner = {
        summName: '',
        level: 0,
        puuid: '',
        champion: '',
        profileIcon: 0
    }

    buscarInv(event: any) {
        if (this.busqueda.nombreInv.trim().length === 0) {
            return;
        }
        this.busqueda.fav = event.target[2].checked;
        this.agregarInvocadorFav();
        this.RGService.buscarInvocador(this.busqueda.nombreInv);
        this.busqueda = {
            nombreInv: this.busqueda.nombreInv,
            region: '',
            fav: false
        };
    }

    copiarDatos(fav: Favs) {
        this.busqueda = {
            nombreInv: fav.nombreInv,
            region: fav.region,
            fav: false
        }
        this.RGService.buscarInvocador(this.busqueda.nombreInv);
    }

    infoPartidas(matchId: string) {
        this.RGService.infoPartidas(matchId);
        return this.RGService.infoChamps;
    }

    get SummChamp() {
        return [this.RGService.SummChamp]
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

    get summFav() {
        return this.RGService.favouriteSummoners;
    }

    get partidasHistorial() {
        return [...this.RGService.matches]
    }

    log(event: any) {
        let checked = event.target.checked;
        this.busqueda.fav = checked;
    }
    
    agregarInvocadorFav() {
        for (let i = 0; i < this.favoritos.length; i++) {
            const nombreFav = this.favoritos[i].nombreInv;
            if ((nombreFav === this.busqueda.nombreInv) && (this.favoritos[i].region === this.busqueda.region) && (this.busqueda.fav == true)) {
                console.log("El favorito ya existe");
                this.busqueda = {
                    nombreInv: '',
                    region: '',
                    fav: false
                };
                return;
            }
        }

        if (this.busqueda.fav === true) {
            this.favoritos.push(this.busqueda);
                localStorage.setItem('favouriteSummoners', JSON.stringify(this.favoritos))
            }
            this.busqueda = {
                nombreInv: this.busqueda.nombreInv,
                region: '',
                fav: false
            }
             this.favoritos = this.RGService.favouriteSummoners;
        }
    }


