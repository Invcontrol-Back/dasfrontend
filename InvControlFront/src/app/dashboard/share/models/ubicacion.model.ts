export class TipoUbicacion {
    ubi_id: number;
    ubi_nombre: string;
    ubi_blo: number;
    blo_nombre: string;
    ubi_tip_ubi: number;
    tip_ubi_nombre: string;

    constructor(
        ubi_id: number,
        ubi_nombre: string,
        ubi_blo: number,
        blo_nombre: string,
        ubi_tip_ubi: number,
        tip_ubi_nombre: string
    ) {
        this.ubi_id = ubi_id;
        this.ubi_nombre = ubi_nombre;
        this.ubi_blo = ubi_blo;
        this.blo_nombre = blo_nombre;
        this.ubi_tip_ubi = ubi_tip_ubi;
        this.tip_ubi_nombre = tip_ubi_nombre;
    }
}