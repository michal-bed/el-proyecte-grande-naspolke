package com.company.naspolke.model.documentDrafts;

import org.osgl.logging.L;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class Utils {
    public static String PROTOCOL_HEADER = "src/main/resources/drafts/financialStatements/protocolHeader.txt";
    public static String MEETING_PLACE_IN_HEADQUARTERS = "src/main/resources/drafts/financialStatements/meetingPlaceInHeadquarters.txt";
    public static String MEETING_PLACE_NOT_IN_HEADQUARTERS = "src/main/resources/drafts/financialStatements/meetingPlaceNotInHeadquarters.txt";

    public static List<String> NO_UPPER_CASE = Arrays.asList("prof.", "prof", "gen", "gen." , "dr", "dr.", "płk", "płk.", "ppłk.", "ppłk", "mjr", "mjr." , "inż", "inż.", "ks", "ks.",
            "profa.", "profa", "gena", "gena." , "dra", "dra.", "płka", "płka.", "ppłka.", "ppłka", "mjra", "mjra.", "marsz", "marsz.", "plac", "ul.", "pl.", "os.", "al.");
    public static String getMonthInWord(int number) {
        switch (number) {
            case 1 -> { return "styczenia"; }
            case 2 -> { return "lutego"; }
            case 3 -> { return "marca"; }
            case 4 -> { return "kwietnia"; }
            case 5 -> { return "maja"; }
            case 6 -> { return "czerwca"; }
            case 7 -> { return "lipca"; }
            case 8 -> { return "sierpnia"; }
            case 9 -> { return "września"; }
            case 10 -> { return "października"; }
            case 11 -> { return "listopada"; }
            default -> { return "grudnia"; }
        }
    }
    public static String placeConjugated(String place){
        switch(place){
            case "WARSZAWA" -> {return "w Warszawie";}
            case "KRAKÓW" -> {return "w Krakowie";}
            case "ŁÓDŹ" -> {return "w Łodzi";}
            case "WROCŁAW" -> {return "we Wrocławiu";}
            case "POZNAŃ" -> {return "w Poznaniu";}
            case "GDAŃSK" -> {return "w Gdańsku";}
            case "SZCZECIN" -> {return "w Szczecinie";}
            case "BYDGOSZCZ" -> {return "w Bydgoszczy";}
            case "LUBLIN" -> {return "w Lublinie";}
            case "BIAŁYSTOK" -> {return "w Białymstoku";}
            case "KATOWICE" -> {return "w Katowicach";}
            case "GDYNIA" -> {return "w Gdyni";}
            case "CZĘSTOCHOWA" -> {return "w Częstochowie";}
            case "RADOM" -> {return "w Radomiu";}
            case "RZESZÓW" -> {return "w Rzeszowie";}
            case "TORUŃ" -> {return "w Toruniu";}
            case "SOSNOWIEC" -> {return "w Sosnowcu";}
            case "KIELCE" -> {return "w Kielcach";}
            case "GLIWICE" -> {return "w Gliwicach";}
            case "OLSZTYN" -> {return "w Olsztynie";}
            case "ZABRZE" -> {return "w Zabrzu";}
            case "BIELSKO-BIAŁA" -> {return "w Bielsko-Białej";}
            case "BYTOM" -> {return "w Bytomiu";}
            case "ZIELONA GÓRA" -> {return "w Górze";}
            case "RYBNIK" -> {return "w Rybniku";}
            case "RUDA ŚLĄSKA" -> {return "w Rudzie Śląskiej";}
            case "OPOLE" -> {return "w Opolu";}
            case "TYCHY" -> {return "w Tychach";}
            case "GORZÓW WIELKOPOLSKI" -> {return "w Gorzowie Wielkopolskim";}
            case "ELBLĄG" -> {return "w Elblągu";}
            case "PŁOCK" -> {return "w Płocku";}
            case "DĄBROWA GÓRNICZA" -> {return "w Dąbrowie Górczniej";}
            case "WAŁBRZYCH" -> {return "w Wałbrzychu";}
            case "WŁOCŁAWEK" -> {return "we Włocławku";}
            case "TARNÓW" -> {return "w Tarnowie";}
            case "CHORZÓW" -> {return "w Chorzowie";}
            case "KOSZALIN" -> {return "w Koszalinie";}
            case "KALISZ" -> {return "w Kaliszu";}
            case "LEGNICA" -> {return "w Legnicy";}
            case "GRUDZIĄDZ" -> {return "w Grudziądzu";}
            case "JAWORZNO" -> {return "w Jaworznie";}
            case "SŁUPSK" -> {return "w Słupsku";}
            case "JASTRZĘBIE-ZDRÓJ" -> {return "w Jastrzębiu-Zdroju";}
            case "NOWY SĄCZ" -> {return "w Nowym Sączu";}
            case "JELENIA GÓRA" -> {return "w Jeleniej Górze";}
            case "SIEDLCE" -> {return "w Siedlcach";}
            case "MYSŁOWICE" -> {return "w Mysłowicach";}
            case "PIŁA" -> {return "w Pile";}
            case "KONIN" -> {return "w Koninie";}
            case "PIOTRKÓW TRYBUNALSKI" -> {return "w Piotrkowie Trybunalskim";}
            default -> {return place;}
        }
    }

}



















































