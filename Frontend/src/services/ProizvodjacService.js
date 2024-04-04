import HttpService from "./HttpService"

const naziv = '/Proizvodjac'

async function get(){

    return await HttpService.get(naziv)
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{
        return e;
    })

}

async function post(proizvodjac){

    return await HttpService.post(naziv,proizvodjac)
    .then((odgovor)=>{
        return {greska: false,poruka:odgovor.data};
    })
    .catch((e)=>{
        return {greska: true,poruka:e};
    })
}
    
async function put(sifra,proizvodjac){

    return await HttpService.put(naziv+'/'+sifra,proizvodjac,link)
    .then((odgovor)=>{
        return{greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        return {greska: true, poruka: e};
    })

}


async function _delete(sifraProizvodjaca){

    return await HttpService.delete(naziv +'/'+sifraProizvodjaca)
    .then((odgovor)=>{
        return {greska: false,poruka:odgovor.data.poruka};
    })
    .catch((e)=>{
        return {greska: true,poruka:e};
    })
}

async function getBySifra(sifra){

    return await HttpService.get(naziv+'/'+sifra)
    .then((o)=>{
        return {greska: false,poruka:o.data}
    })
    .catch((e)=>{
        return {greska: true,poruka:e};
    });
}




export default{
    get,
    post,
   _delete,
   getBySifra,
   put
    
   
}
