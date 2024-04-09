using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{

    public record ProizvodjacDTORead(int Sifra, string Naziv, string? Link);

    public record ProizvodjacDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,


        [Required(ErrorMessage = "link obavezno")]
        string? Link);



    public record AromaDTORead(int Sifra, string? Naziv, int Proizvod, string? Vrsta, bool? Hladilo);

    public record AromaDTOInsertUpdate([Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,
        [Required(ErrorMessage = "Proizvod obavezno")]
        int? Proizvod,
        [Required(ErrorMessage = "Vrsta obavezno")]

        string? Vrsta,
        bool? Hladilo);

    public record ProizvodDTORead(int Sifra, string? Naziv,
        string? ProizvodjacNaziv);
    

    public record ProizvodDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
       
        string? Naziv,
        [Required(ErrorMessage = "Proizvodjac obavezno")]
        int? ProizvodjacSifra);
}
