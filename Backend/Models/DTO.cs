﻿using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{

    public record ProizvodjacDTORead(int Sifra, string Naziv, string? Link, string? Slika);

    public record ProizvodjacDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,


       [Required(ErrorMessage = "link obavezno")]
        string? Link,

        string? Slika);

    public record AromaDTORead(int Sifra, string? Naziv, string? ProizvodNaziv, string? Vrsta, bool? Hladilo);

    public record AromaDTOInsertUpdate([Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,
        [Required(ErrorMessage = "Proizvod obavezno")]
         int ?ProizvodSifra,
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

    public record SlikaDTO([Required(ErrorMessage = "Base64 zapis slike obavezno")] string Base64);
    public record OperaterDTO(
       [Required(ErrorMessage = "Email obavezno")]
        string? email,
       [Required(ErrorMessage = "Lozinka obavezno")]
        string? password);

}

