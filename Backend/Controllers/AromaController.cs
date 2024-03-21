using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AromaController:ControllerBase
    {
        
        private readonly TekucineContext _context;


    public AromaController(TekucineContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {

            return new JsonResult(_context.Arome.ToList());
        }

        [HttpPost]

        public IActionResult Post(Aroma aroma)
        {
            _context.Arome.Add(aroma);
            _context.SaveChanges();
            return new JsonResult(aroma);

        }
        [HttpPut]
        [Route("{sifra:int}")]

        public IActionResult Post(int sifra, Aroma aroma
            )
        {
            var aromaIzBaze = _context.Arome.Find(sifra);
            aromaIzBaze.Naziv = aroma.Naziv;
            aromaIzBaze.Proizvod = aroma.Proizvod;


            _context.Arome.Update(aromaIzBaze);
            _context.SaveChanges();

            return new JsonResult(aromaIzBaze);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var proizvodIzBaze = _context.Arome.Find(sifra);
            _context.Arome.Remove(proizvodIzBaze);
            _context.SaveChanges();

            return new JsonResult(new { poruka = "Obrisano" });
        }



    }
}