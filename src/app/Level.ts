export interface Level{
    number: number;
    expValue: number;
}

function riseExp(lvl : Level, exp : number):void{
    lvl.expValue += exp;
    if(checkForLevelUp(lvl)) return; 
    levelUp(lvl)
            
}
function checkForLevelUp(lvl:Level):boolean{
    return lvl.expValue >= 100;
}
function levelUp(lvl:Level):void{
    lvl.expValue -= 100;
    lvl.number += 1;
}
export default {
    riseExp
} as const;