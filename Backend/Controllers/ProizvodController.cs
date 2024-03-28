
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodController:ControllerBase
    {
        
        private readonly TekucineContext _context;

        
        public ProizvodController(TekucineContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Proizvodi.ToList());

        }
        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return new JsonResult(_context.Proizvodi.Find(sifra));
        }

        [HttpPost]

        public IActionResult Post(Proizvod proizvod) 
        { 
         _context.Proizvodi.Add(proizvod);
         _context.SaveChanges();
            return new JsonResult(proizvod);

        }
        [HttpPut]
        [Route("{sifra:int}")]

        public IActionResult Post(int sifra,Proizvod proizvod
            ) 
        {
            var proizvodIzBaze=_context.Proizvodi.Find(sifra);
            proizvodIzBaze.Naziv = proizvod.Naziv;
            proizvodIzBaze.Proizvodjac=proizvod.Proizvodjac;
             

            _context.Proizvodi.Update(proizvodIzBaze);
            _context.SaveChanges();

            return new JsonResult(proizvodIzBaze);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var proizvodIzBaze = _context.Proizvodi.Find(sifra);
            _context.Proizvodi.Remove(proizvodIzBaze);
            _context.SaveChanges();

            return new JsonResult(new {poruka="Obrisano"});
        }



    }
}
