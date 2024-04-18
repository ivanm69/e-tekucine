using Backend.Data;
using Backend.Models;
using Backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;
using System.Data.Entity.Core.Metadata.Edm;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AromaController: TekucineController<Aroma,AromaDTORead,AromaDTOInsertUpdate>
    {
        
    public AromaController(TekucineContext context):base(context)
        {
            DbSet = _context.Arome;
            _mapper = new MappingAroma();
            

        }

        protected override void KontrolaBrisanje(Aroma entitet)
        {
            var lista = _context.Proizvodi
                .Include(x => x.Aroma)
                .Where(x => x.Aroma != null && x.Aroma.Sifra == entitet.Sifra)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Aroma se ne može obrisati jer je postavljen na proizvodima: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Naziv).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]);
            }
        }

        protected override Aroma KreirajEntitet(AromaDTOInsertUpdate dto)
        {
            var proizvod = _context.Proizvodi.Find(dto.ProizvodSifra) ?? throw new Exception("Ne postoji proizvod s šifrom " + dto.ProizvodSifra + " u bazi");

            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Proizvod = proizvod;


            return entitet;
        }

        protected override List<AromaDTORead> UcitajSve()
        {
            var lista = _context.Arome
                    .Include(x => x.Proizvod)
            
      
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected override Aroma NadiEntitet(int sifra)
        {
            return _context.Arome.Include(i => i.Proizvod)
         .FirstOrDefault(x => x.Sifra == sifra) ?? throw new Exception("Ne postoji Proizvod s šifrom " + sifra + " u bazi");
        }



        protected override Aroma PromjeniEntitet(AromaDTOInsertUpdate dto, Aroma entitet)
        {
            var proizvod = _context.Proizvodi.Find(dto.ProizvodSifra) ?? throw new Exception("Ne postoji proizvodjac s šifrom " + dto.ProizvodSifra + " u bazi");




            entitet.Naziv = dto.Naziv;
            entitet.Proizvod = proizvod;
            entitet.Vrsta = dto.Vrsta;
            entitet.Hladilo = dto.Hladilo;

            return entitet;
        }
    }
}