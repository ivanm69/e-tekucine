using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodjacController
    {
        
        
        private readonly TekucineContext _context;

      
        public ProizvodjacController(TekucineContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Proizvodjaci.ToList());
        }

        [HttpPost]

        public IActionResult Post(Proizvodjac proizvodjac)
        {
            _context.Proizvodjaci.Add(proizvodjac);
            _context.SaveChanges();
            return new JsonResult(proizvodjac);

        }
        [HttpPut]
        [Route("{sifra:int}")]

        public IActionResult Post(int sifra, Proizvodjac proizvodjac
            )
        {
            var proizvodjacIzBaze = _context.Proizvodjaci.Find(sifra);
            proizvodjacIzBaze.Naziv = proizvodjac.Naziv;
            proizvodjacIzBaze.link = proizvodjac.link;


            _context.Proizvodjaci.Update(proizvodjacIzBaze);
            _context.SaveChanges();

            return new JsonResult(proizvodjacIzBaze);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var proizvodjacIzBaze = _context.Proizvodjaci.Find(sifra);
            _context.Proizvodjaci.Remove(proizvodjacIzBaze);
            _context.SaveChanges();

            return new JsonResult(new { poruka = "Obrisano" });
        }



    }
}
