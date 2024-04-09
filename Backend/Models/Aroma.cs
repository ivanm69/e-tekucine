using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Aroma : Entitet
    {
        public string? Naziv { get; set; }
        public int?Proizvod { get; set; }

        public string? Vrsta { get; set; }

        public bool? Hladilo { get; set; }
    }
}
