using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingAroma : Mapping<Aroma,AromaDTORead,AromaDTOInsertUpdate>
    {
       
        

            public MappingAroma()
            {
                MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                    c.CreateMap<Aroma, AromaDTORead>()
                    
                    .ConstructUsing(entitet =>
                     new AromaDTORead(
                        entitet.Sifra,
                        entitet.Naziv,
                        entitet.Proizvod == null ? null : entitet.Proizvod.Naziv,
                       
                        entitet.Vrsta,
                        entitet.Hladilo

    ));
                }));

                MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                    c.CreateMap<AromaDTOInsertUpdate, Aroma>();
                }));

                MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                    c.CreateMap<Aroma, AromaDTOInsertUpdate>()
                  
                    .ConstructUsing(entitet =>
                     new AromaDTOInsertUpdate(
                        entitet.Naziv,
                        entitet.Proizvod == null ? null : entitet.Proizvod.Sifra, 
                        entitet.Vrsta,
                        entitet.Hladilo));
                }));
            }



        }
    }



