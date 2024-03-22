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

export default{
    get
}