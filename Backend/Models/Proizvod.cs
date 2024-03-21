using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Proizvod: Entitet
    {
        public string? Naziv { get; set; }
        public int? Proizvodjac { get; set; }
        

    }
}
