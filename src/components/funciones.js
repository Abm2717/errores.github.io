

export function errorAbsoluto(vReal, vAprox){
    return Math.abs(vReal - vAprox);
}

export function errorRelativo(errorAbsoluto, vReal){
    return errorAbsoluto / vReal;
}