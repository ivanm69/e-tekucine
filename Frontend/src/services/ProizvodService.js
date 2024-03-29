import HttpService from "./HttpService"

const naziv = '/Proizvod'

async function get(){

    return await HttpService.get(naziv)
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{
        return e;
    })

}

async function post(proizvod){

    return await HttpService.post(naziv,proizvod)
    .then((odgovor)=>{
        return {greska: false,poruka:odgovor.data};
    })
    .catch((e)=>{
        return {greska: true,poruka:e};
    })

}
async function _delete(sifraProizvoda){

    return await HttpService.delete(naziv +'/'+sifraProizvoda)
    .then((odgovor)=>{
        return {greska: false,poruka:odgovor.data.poruka};
    })
    .catch((e)=>{
        return {greska: true,poruka:e};
    })

}
export default{
    get,
    post,
   _delete
   
}
