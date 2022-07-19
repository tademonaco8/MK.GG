import { Component } from "@angular/core";
import { RGService } from '../index/services/rg.service';

@Component({
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css'],
    selector: "match"
})

export class matchComponente {
    constructor( private RGService : RGService) {}
}