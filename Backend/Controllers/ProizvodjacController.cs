using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodjacController : TekucineController<Proizvodjac, ProizvodjacDTORead, ProizvodjacDTOInsertUpdate>
    {
        public ProizvodjacController(TekucineContext context) : base(context)
        {
            DbSet = _context.Proizvodjaci;
        }
        protected override void KontrolaBrisanje(Proizvodjac entitet)
        {
            var lista = _context.Proizvodi
                .Include(x => x.Proizvodjac)
                .Where(x => x.Proizvodjac.Sifra == entitet.Sifra)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Proizvodjac se ne može obrisati jer je postavljen na proizvodima: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Naziv).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); 
           }
        }

    }
}

