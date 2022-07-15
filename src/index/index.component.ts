import { Component } from "@angular/core";

interface Busqueda {
    nombreInv: string,
    region: string,
    fav: boolean
}

interface Favs {
    nombreInv: string;
    region: string;
}

interface Partidas {
    tipo: string;
    campeonUtilizado: string;
    minutos: number;
    ganada: boolean;

}

@Component({
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    selector: "main"
})

export class IndexComponente {
    title = 'MONAK.GG';
    favoritos: Favs[] = [
        {
            nombreInv : 'TMonak',
            region : 'LA2'
        }
    ];
    partidas: Partidas[] = [];
    busqueda: Busqueda = {
        nombreInv: '',
        region: '',
        fav: false
    }

    buscarInv(event : any) {
        if (this.busqueda.nombreInv.trim().length === 0) {
            return;
        }
        console.log(this.busqueda);
        this.busqueda.fav = event.target[2].checked;
        this.agregarInvocadorFav();
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
        console.log(fav)

    }

    agregarInvocadorFav() {
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

