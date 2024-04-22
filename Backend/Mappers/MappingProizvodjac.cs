using AutoMapper;
using Backend.Models;


namespace Backend.Mappers
{
    public class MappingProizvodjac : Mapping<Proizvodjac, ProizvodjacDTORead, ProizvodjacDTOInsertUpdate>
    {

        public MappingProizvodjac()
        {
            MapperMapReadToDTO = new Mapper(
            new MapperConfiguration(c =>
            {
                c.CreateMap<Proizvodjac, ProizvodjacDTORead>()
                   .ConstructUsing(entitet =>
                        new ProizvodjacDTORead(
                            entitet.Sifra,
                            entitet.Naziv,
                            entitet.Link,
                            PutanjaDatoteke(entitet)));
            })
            );

            MapperMapInsertUpdateToDTO = new Mapper(
            new MapperConfiguration(c =>
            {
                c.CreateMap<Proizvodjac, ProizvodjacDTOInsertUpdate>()
                   .ConstructUsing(entitet =>
                        new ProizvodjacDTOInsertUpdate(
                            entitet.Naziv,
                            entitet.Link,
                            PutanjaDatoteke(entitet)));
            })
            );
        }

        private static string PutanjaDatoteke(Proizvodjac e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "proizvodjaci" + ds + e.Sifra + ".png");
                return File.Exists(slika) ? "/slike/proizvodjaci/" + e.Sifra + ".png" : null;
            }
            catch
            {
                return null;
            }
        }
    }
}