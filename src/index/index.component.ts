import { Component } from "@angular/core";

interface Busqueda {
    nombreInv : string, 
    region : string
}

@Component ({
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    selector: "main"
})

export class IndexComponente {
    title = 'MONAK.GG';
    
    

    busqueda : Busqueda= {
        nombreInv : '',
        region : 'la2'
    }
    
    agregar(){
        console.log(this.busqueda);    
    }
}

