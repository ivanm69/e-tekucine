using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Proizvod : Entitet
    {
        public string? Naziv { get; set; }

        [ForeignKey("proizvodjac")]
        public required Proizvodjac Proizvodjac { get; set; }


        public required Aroma Aroma { get; set; }
    }
}
