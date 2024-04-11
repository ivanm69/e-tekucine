using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingProizvod : Mapping<Proizvod, ProizvodDTORead, ProizvodDTOInsertUpdate>
    {

        public MappingProizvod()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Proizvod, ProizvodDTORead>()
                .ConstructUsing(entitet =>
                 new ProizvodDTORead(
                    entitet.Sifra,
                    entitet.Naziv,
                    entitet.Proizvodjac == null ? "" : entitet.Proizvodjac.Naziv
                    
                    
));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<ProizvodDTOInsertUpdate, Proizvod>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Proizvod, ProizvodDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new ProizvodDTOInsertUpdate(
                    entitet.Naziv,
       
                    entitet.Proizvodjac == null ? null : entitet.Proizvodjac.Sifra));
            }));
        }



    }
}
