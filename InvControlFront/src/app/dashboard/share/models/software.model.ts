export class Software {
        sof_id: number;
        sof_nombre: string;
        sof_version: number;
        sof_tipo: string;
        sof_duracion: string;
        sof_descripcion: string;
        sof_tip_ubi: number;
        tip_ubi_nombre: string;
    
        constructor(
            sof_id: number,
            sof_nombre: string,
            sof_version: number,
            sof_tipo: string,
            sof_duracion: string,
            sof_descripcion: string,
            sof_tip_ubi: number,
            tip_ubi_nombre: string
        ) {
            this.sof_id = sof_id;
            this.sof_nombre = sof_nombre;
            this.sof_version = sof_version;
            this.sof_tipo = sof_tipo;
            this.sof_duracion = sof_duracion;
            this.sof_descripcion = sof_descripcion;
            this.sof_tip_ubi = sof_tip_ubi;
            this.tip_ubi_nombre = tip_ubi_nombre;
        }
}
    
    

    
