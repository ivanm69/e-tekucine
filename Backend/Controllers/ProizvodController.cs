
using Backend.Data;
using Backend.Mappers;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodController :TekucineController<Proizvod, ProizvodDTORead, ProizvodDTOInsertUpdate>
    {
        public ProizvodController(TekucineContext context) : base(context)
        {
            DbSet = _context.Proizvodi; 
            _mapper = new MappingProizvod();
        }
        protected override void KontrolaBrisanje(Proizvod entitet)
        {
            var lista = _context.Arome
                .Include(x => x.Proizvod)
                .Where(x => x.Proizvod.Sifra ==entitet.Sifra)
                .ToList();
            if(lista == null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Proizvod se ne moze obrisati jer je postavljen na Aromi : ");
                foreach (var e in lista)
                {
                    sb.Append(e.Naziv).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]);
            }
        }

        protected override Proizvod KreirajEntitet(ProizvodDTOInsertUpdate dto)
        {
            var proizvodjac = _context.Proizvodjaci.Find(dto.ProizvodjacSifra) ?? throw new Exception("Ne postoji proizvodjac s šifrom " + dto.ProizvodjacSifra + " u bazi");
            
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Proizvodjac = proizvodjac;
           
            return entitet;
        }

        protected override List<ProizvodDTORead> UcitajSve()
        {
            var lista = _context.Proizvodi
                    .Include(g => g.Proizvodjac)
                    
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected override Proizvod NadiEntitet(int sifra)
        {
            return _context.Proizvodi.Include(i => i.Proizvodjac)
         .FirstOrDefault(x => x.Sifra == sifra) ?? throw new Exception("Ne postoji Proizvod s šifrom " + sifra + " u bazi");
        }



        protected override Proizvod PromjeniEntitet(ProizvodDTOInsertUpdate dto, Proizvod entitet)
        {
            var proizvodjac = _context.Proizvodjaci.Find(dto.ProizvodjacSifra) ?? throw new Exception("Ne postoji proizvodjac s šifrom " + dto.ProizvodjacSifra + " u bazi");
            


         
            entitet.Naziv = dto.Naziv;
            entitet.Proizvodjac = proizvodjac;
            

            return entitet;
        }
    }
}
