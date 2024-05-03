using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Mappers;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers

{
    /// <summary>
    /// Apstraktna klasa koja objedinjuje zajedničke rute CRUD operacija
    /// </summary>
    /// <typeparam name="T">Tip entiteta</typeparam>
    /// <typeparam name="TDR">DTO read</typeparam>
    /// <typeparam name="TDI">DTO insert i update</typeparam>
    /// <param name="context">Kontekst baze podataka</param>
    [Authorize]
    public abstract class TekucineController<T, TDR, TDI>(TekucineContext context) : ControllerBase where T : Entitet
    {
           
        /// <summary>
        /// Trenutni DBset
        /// </summary>
        protected DbSet<T>? DbSet = null;
        /// <summary>
        /// Mapper koji koristim
        /// </summary>
        protected Mapping<T, TDR, TDI> _mapper = new();
        /// <summary>
        /// Svaka podklasa mora implementirati metodu a ako nema uvjeta brisanja ostavlja ju praznu
        /// </summary>
        /// <param name="entitet"></param>
        protected abstract void KontrolaBrisanje(T entitet);
        /// <summary>
        /// Kontekst baze podataka (DI)
        /// </summary>
        protected readonly TekucineContext _context = context;
        /// <summary>
        /// Dohvaćanje svih entiteta iz baze prema DTO read
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                return new JsonResult(UcitajSve());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Dohvaćanje jednog entiteta iz baze prema DTO read
        /// </summary>
        /// <param name="sifra">Primarni ključ u bazi</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var entitet = NadiEntitet(sifra);
                return new JsonResult(_mapper.MapInsertUpdateToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Dodavanje novog entiteta u bazu
        /// </summary>
        /// <param name="entitetDTO">DTO insert i update</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post(TDI entitetDTO)
        {
            if (!ModelState.IsValid || entitetDTO == null)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var entitet = KreirajEntitet(entitetDTO);
                _context.Add(entitet);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created,
                                       _mapper.MapReadToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Promjena entiteta u bazi
        /// </summary>
        /// <param name="sifra">Primarni ključ</param>
        /// <param name="dto">DTO insert i update</param>
        /// <returns></returns>
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, TDI dto)
        {
            if (sifra <= 0 || !ModelState.IsValid || dto == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var entitetIzBaze = NadiEntitet(sifra);
                _context.Entry(entitetIzBaze).State = EntityState.Detached;
                var entitet = PromjeniEntitet(dto, entitetIzBaze);
                entitet.Sifra = sifra;
                _context.Update(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, _mapper.MapInsertUpdateToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Brisanej entiteta iz baze (ako je kontrola brisanja prošla)
        /// </summary>
        /// <param name="sifra">Primarni ključ</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }
            try
            {
                var entitetIzbaze = NadiEntitet(sifra);
                KontrolaBrisanje(entitetIzbaze);
                _context.Remove(entitetIzbaze);
                _context.SaveChanges();
                return Ok("Obrisano");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        protected virtual T NadiEntitet(int sifra)
        {
            var entitetIzbaze = DbSet?.Find(sifra);
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji entitet s šifrom " + sifra + " u bazi");
            }

            return entitetIzbaze;
        }

        protected virtual List<TDR> UcitajSve()
        {
            var lista = DbSet?.ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected virtual T KreirajEntitet(TDI dto)
        {
            return _mapper.MapInsertUpdatedFromDTO(dto);
        }

        protected virtual T PromjeniEntitet(TDI dto, T s)
        {
            return _mapper.MapInsertUpdatedFromDTO(dto);
        }

    }
}