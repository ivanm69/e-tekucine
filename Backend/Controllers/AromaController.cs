using Backend.Data;
using Backend.Models;
using Backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AromaController: TekucineController<Aroma,AromaDTORead,AromaDTOInsertUpdate>
    {
        
    public AromaController(TekucineContext context):base(context)
        {
            DbSet = _context.Arome;
           
        }

        protected override void KontrolaBrisanje(Aroma entitet)
        {
            var lista = _context.Proizvodi
               // .Include(x => x.Aroma)
               // .Where(x => x.Aroma != null && x.Aroma.Sifra == entitet.Sifra)
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
    }
}
