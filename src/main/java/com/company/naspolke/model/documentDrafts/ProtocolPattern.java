package com.company.naspolke.model.documentDrafts;

import org.springframework.stereotype.Component;

@Component
public class ProtocolPattern {

    static String resolutionHeaderText = """
            Protokół nr %s
            %s Zgromadzenia Wspólników spółki pod firmą
            %s z siedzibą %s
            z dnia %s
            """;
    static String resolutionPattern = "Uchwała nr %s \n%s  Zgromadzenia Wspólników %s z siedzibą %s\nz dnia %s \nw sprawie %s\n";
    String meetingPlace = "Dnia %s %s odbyło się Zwyczajne Zgromadzenie Wspólników spółki pod firmą %s z siedzibą %s.\n" +
            "Na Zwyczajnym Zgromadzeniu Wspólników stawili się:";
    static String resolutionChairpersonText = "%s Zgromadzenie Wspólników pod firmą %s " +
            "z siedzibą %s postanawia, że zgromadzeniu przewodniczyć będzie %s %s.";

    static String resolutionRecorderText = "%s Zgromadzenie Wspólników pod firmą %s " +
            "z siedzibą %s postanawia, że zgromadzenie protokołować będzie %s %s.";
    static String ResolutionVotingUnanimously = "Po podliczeniu głosów, przewodniczący stwierdził, że:\n" +
            "w głosowaniu %s jednogłośnie przyjęto powyższą uchwałę.";

    static String resolutionVotingNotUnanimously = "Po podliczeniu głosów, przewodniczący stwierdził, że:\n" +
            "w głosowaniu %s brało udział łącznie %s %s, przy czym %s %s „za”, %s %s „przeciw”, %s %s „wstrzymujących się”\n" +
            "Przewodniczący stwierdził, że uchwała %s została przyjęta oraz nie zgłoszono sprzeciwów \n";

    static String protocolAttendanceInfo = "Lista obecności, zawierająca spis uczestników %s Zgromadzenia Wspólników, " +
            "sporządzona została niezwłocznie po objęciu funkcji przez przewodniczącego, a następnie przez niego podpisana i " +
            "wyłożona podczas Zgromadzenia. Listę tę podpisaną przez uczestników Zgromadzenia oraz przewodniczącego i protokolanta " +
            "załączono do niniejszego protokołu.\n\n";

    static String meetingValidationFormula = "Przewodniczący Zgromadzenia stwierdził, że Zgromadzenie odbywa się %s. Obecni " +
            "lub reprezentowani są wspólnicy którym przysługuje łącznie %s i tyle samo głosów, na ogólną liczbę %s " +
            "i tyle samo głosów, co oznacza, że reprezentowany jest na nim %s, nadto nikt z obecnych nie " +
            "zgłosił sprzeciwu dotyczącego odbycia Zgromadzenia, a zatem zgodnie z art. %s  Zgromadzenie zdolne jest " +
            "do podejmowania uchwał%s.\n";

    static String conveningUnofficialFormula ="bez formalnego zwołania, lecz obecni lub reprezentowani są wszyscy wspólnicy";
    static String conveningFormalFormula ="za formalnym zwołaniem";

    static String objectionsToTheResolutionsInfo =", o ile nikt z obecnych nie zgłosi sprzeciwu co do wniesienia poszczególnych spraw do porządku obrad";
    static String informationAboutAgenda = "Wobec powyższego, przewodniczący przedstawił proponowany porządek obrad, a następnie zaproponował podjęcie uchwały w sprawie jego przyjęcia, w następującym brzmieniu:";
    static String agendaPointsConstant = "%s. otwarcie Zwyczajnego Zgromadzenia;\n" +
            "%s. wybór Przewodniczącego Zgromadzenia i Protokolanta;\n" +
            "%s. stwierdzenie prawidłowości zwołania Zgromadzenia;\n" +
            "%s. przyjęcie porządku obrad;\n" +
            "%s. podjęcie uchwały w przedmiocie rozpatrzenia i zatwierdzenie sprawozdania finansowego Spółki oraz sprawozdania Zarządu;\n" +
            "%s\n" +
            "%s. podjęcie uchwały w przedmiocie udzielenia absolutorium organom spółki;\n" +
            "%s. wolne głosy i wnioski;\n" +
            "%s. zamknięcie obrad Zgromadzenia;";
    static String agendaProfit = "%s. podjęcie uchwały w przedmiocie sposobu podziału zysku;";
    static String agendaLose = "%s. podjęcie uchwały w przedmiocie sposobu pokrycia straty;";
    static String agendaNoProfitAndNoLose = "";
    static String agendaIntroduction = "%s Zgromadzenie Wspólników spółki postanawia przyjąć następujący porządek obrad:\n";

    static String financialStatementResolution ="1. %s sprawozdanie finansowe Spółki za okres od  %s, zatwierdza sprawozdanie zawierające:\n" +
            "   a) wprowadzenie do sprawozdania finansowego;\n" +
            "   b) bilans sporządzony na dzień %s, który wykazuje po stronie aktywów i            pasywów kwotę %s zł.;\n" +
            "   c) rachunek zysków i strat za okres od %2$s        wariant porównawczy wykazujący %s%s zł.;\n" +
            "   d) dodatkowe informacje i wyjaśnienia.\n" +
            "2. %1$s zatwierdza sprawozdanie Zarządu z działalności jednostki w okresie od %2$s\n" +
            "3. Uchwała wchodzi w życie z dniem jej podjęcia.\n";

    static String financialStatementResolutionTitle = "rozpatrzenia i zatwierdzenia sprawozdania finansowego Spółki oraz sprawozdania Zarządu za okres od %s";
    static String startingResolutionText = "Niniejszym Zwyczajne Zgromadzenie Wspólników spółki pod firmą: %s z siedzibą %s";
    static String reportingPeriodPattern = "dnia %s r. do dnia %sr.";

    static String amountProfitLoseTitle = "%s za okres od %s";
    static String amountProfitLoseText = "1. %s podejmuje uchwałę co do sposobu %s i postanawia, że %s %s.\n" +
            "2. Uchwała wchodzi w życie z dniem jej podjęcia.\n";
    static String profitAllocation = "z uwagi na to, że osiągnięty zysk jest większy niż pozostała strata z lat przeszłych" +
            " zysk zostanie przeznaczony w części na pokrycie całej pozostałej straty, natomiast nadwyżka " +
            "zostanie przeznaczona na kapitał zapasowy";

    static String approvalResolutionHeader = "udzielenia absolutorium %s z wykonywania przez %s obowiązków za okres od dnia %s";
    static String approvalResolutionText1 = "Z uwagi na to, że %s ";
    static String approvalResolutionText2 = "w okresie od %s %s funkcję %s niniejszym Zwyczajne Zgromadzenie Wspólników, udziela %s absolutorium z " +
            "pełnionych przez %s obowiązków w Spółce";

    static String exclusionFromVoting = "Zgodnie z art. 244 k.s.h. z głosowania nad uchwałą został wyłączony wspólnik %s.";
    static String conclusionsOfTheMeeting = "Wobec braku wolnych wniosków i wyczerpania porządku obrad, przewodniczący " +
            "zamknął obrady Zwyczajnego Zgromadzenia Wspólników Spółki.";

    static String appendixInfo = "Załącznik nr 1 do protokołu %s \n" +
            "Zwyczajnego Zgromadzenia Wspólników spółki\n" +
            "pod firmą %s\n" +
            "z siedzibą %s\n";

    static String protocolNumberPattern = "%s/%s/%s/%s";
    static String appendixAttendanceListIntro = "Na Zwyczajnym Zgromadzeniu Wspólników stawili się:";
    static String placeForSign = "......................................................................................................";
    static String recorderAndChairpersonSign ="..............................                                     ...............................\n"+
            "Przewodniczący                                       Protokolant";
}
