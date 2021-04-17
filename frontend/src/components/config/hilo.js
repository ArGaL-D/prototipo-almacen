export const generarHilo = () =>{
    const digitoA = Math.floor(Math.random()*100);
    const digitoB = Math.floor(Math.random()*100);
    const digitoC = Math.floor(Math.random()*100);
    
    const index1 =  Math.floor(Math.random()*52);
    const index2 =  Math.floor(Math.random()*52);
    const index3 =  Math.floor(Math.random()*52);
    const index4 =  Math.floor(Math.random()*52);
    
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const hilo = `${digitoA}${letter[index1]}${digitoB}${letter[index2]}${letter[index3]}${letter[index4]}${digitoC}`;
    
       
    return hilo;
}