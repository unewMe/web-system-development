package com.example.productList;


public class Produkt {

    private Long id;
    private String nazwa;
    private Double waga;
    private Double cena;
    private String kategoria;

    public Produkt() {
    }

    public Produkt(Long id, String nazwa, Double waga, Double cena, String kategoria) {
        this.id = id;
        this.nazwa = nazwa;
        this.waga = waga;
        this.cena = cena;
        this.kategoria = kategoria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public Double getWaga() {
        return waga;
    }

    public void setWaga(Double waga) {
        this.waga = waga;
    }

    public Double getCena() {
        return cena;
    }

    public void setCena(Double cena) {
        this.cena = cena;
    }

    public String getKategoria() {
        return kategoria;
    }

    public void setKategoria(String kategoria) {
        this.kategoria = kategoria;
    }
}
