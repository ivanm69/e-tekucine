import  {get,obrisi,dodaj,getBySifra,promjeni,dohvatiPorukeAlert, httpService, obradiUspjeh, obradiGresku } from "./HttpService";

// ovdje će doći ostale rute koje nisu odrađene u HttpService
async function postaviSliku(sifra, slika) {
    return await httpService.put('/Proizvodjac/postaviSliku/' + sifra, slika).then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return obradiGresku(e);});
  }


export default{
    get,
    obrisi,
    dodaj,
    promjeni,
    getBySifra,
    dohvatiPorukeAlert,
    postaviSliku
};