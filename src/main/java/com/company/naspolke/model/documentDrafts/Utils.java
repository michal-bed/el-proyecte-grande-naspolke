package com.company.naspolke.model.documentDrafts;

public class Utils {

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
}
