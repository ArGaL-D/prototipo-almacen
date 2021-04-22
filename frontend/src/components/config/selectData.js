/* 
    Configuración de valores para el 'DropDown' tag Select
*/

// DropDown - status (Equipo)
export const status = [
    'Disponible',
    'Prestado',
    'Inservible',
    'En reparación'
];

// DropDown - ubicación (Edificio)

export const edificio = ["edificio",1,2,3,4,5,6,7];

// DropDown - ubicación (Piso)

export const piso = (edificio) => {
    let aulaArray = ["piso"];

    if ( edificio === 1 || edificio === 2 || edificio === 3 || edificio === 5 ){
        for(let i=1; i<=4; i++){
            aulaArray.push(i);
        }
    }else if ( edificio === 4){
        for(let i=1; i<=3; i++){
            aulaArray.push(i);
        }
    }else if ( edificio === 6 || edificio === 7){
        for(let i=1; i<=2; i++){
            aulaArray.push(i);
        }
    }
   
    return aulaArray;
};

// DropDown - ubicación (Aula)

export const aula = (edificio,piso) =>{
    let aulaArray = ["aula"];   
    let aula = {inicio: '', fin: ''};

    if ( edificio === 1 ){
        switch(piso){
            case 1: aula = {inicio: 101, fin: 107}; break;
            case 2: aula = {inicio: 111, fin: 117}; break;
            case 3: aula = {inicio: 121, fin: 127}; break;
            case 4: aula = {inicio: 131, fin: 137}; break;
            default: break;
        }
        for(let i=aula.inicio; i<=aula.fin; i++){                
                aulaArray.push(i);
        }
    }else if ( edificio === 2){
        switch(piso){
            case 1: aula = {inicio: 201, fin: 207}; break;
            case 2: aula = {inicio: 211, fin: 217}; break;
            case 3: aula = {inicio: 221, fin: 227}; break;
            case 4: aula = {inicio: 231, fin: 237}; break;
            default: break;
        }
        for(let i=aula.inicio; i<=aula.fin; i++){                
                aulaArray.push(i);
        }
    }else if ( edificio === 3){
        switch(piso){
            case 1: aula = {inicio: 301, fin: 307}; break;
            case 2: aula = {inicio: 311, fin: 317}; break;
            case 3: aula = {inicio: 321, fin: 327}; break;
            case 4: aula = {inicio: 331, fin: 337}; break;
            default: break;
        }
        for(let i=aula.inicio; i<=aula.fin; i++){                
                aulaArray.push(i);
        }
    }
    else if ( edificio === 4){
        switch(piso){
            case 1: aula = {inicio: 401, fin: 407}; break;
            case 2: aula = {inicio: 411, fin: 417}; break;
            case 3: aula = {inicio: 421, fin: 427}; break;
            case 4: aula = {inicio: 431, fin: 437}; break;
            default: break;
        }
        for(let i=aula.inicio; i<=aula.fin; i++){                
                aulaArray.push(i);
        }
    }
    else if ( edificio === 5){
        switch(piso){
            case 1: aula = {inicio: 501, fin: 507}; break;
            case 2: aula = {inicio: 511, fin: 517}; break;
            case 3: aula = {inicio: 521, fin: 527}; break;
            case 4: aula = {inicio: 531, fin: 537}; break;
            default: break;
        }
        for(let i=aula.inicio; i<=aula.fin; i++){                
                aulaArray.push(i);
        }
    }
    else if ( edificio === 6){
        switch(piso){
            case 1: aula = {inicio: 601, fin: 607}; break;
            case 2: aula = {inicio: 611, fin: 617}; break;
            default: break;
        }
        for(let i=aula.inicio; i<=aula.fin; i++){                
                aulaArray.push(i);
        }
    }else if ( edificio === 7){
        switch(piso){
            case 1: aula = {inicio: 701, fin: 707}; break;
            case 2: aula = {inicio: 711, fin: 717}; break;
            default: break;
        }
        for(let i=aula.inicio; i<=aula.fin; i++){                
                aulaArray.push(i);
        }
    }
        
    return aulaArray;
}


export const almacen = [
    "Dirección",
    "Escaleras",
    "Laboratorio Clínicos",    
    "Site",
    "Site PB",
    "Site 1P",
    "Site 2P"
];

export const almacenEdificio = [7,4];

export const almacenPiso = [0,1,2];

export const reparacion = [
    'Reparación',
    'Mantenimiento',
    'Disponible'
];

export const etapaReparacion = [
    'Etapa',
    'Cambio de pieza(s)',
    'Desarmado',
    'En espera de pieza(s)',
    'Ensamble',
    'Finalizado',
    'Inconcluso',
    'Limpieza',
    'Revisión',
    'Solicitud de pieza(s)',    
    'Otro'
];

export const tipoPrestamo = [
    'Tipo de formulario',
    'Alumno',
    'Profesor',
    'Asignación'
];

export const acceso = ["No","Si"]
