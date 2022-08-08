package com.company.naspolke.model.documentDrafts;

import org.springframework.stereotype.Component;

@Component
class ProtocolPattern {
    static String ResolutionPattern = "Uchwała nr %s \n%s  Zgromadzenia Wspólników %s z siedzibą %s\nz dnia %s \nw sprawie %s\n";

    static String ResolutionChairpersonText = "%s Zgromadzenie Wspólników pod firmą %s " +
            "z siedzibą %s postanawia, że zgromadzeniu przewodniczyć będzie %s %s.";

    static String ResolutionVotingUnanimously = "Po podliczeniu głosów, przewodniczący stwierdził, że:\n" +
            "w głosowaniu %s jednogłośnie przyjęto powyższą uchwałę.";

    static String ResolutionVotingNotUnanimously = "Po podliczeniu głosów, przewodniczący stwierdził, że:\n" +
            "w głosowaniu %s brało udział łącznie %s %s, przy czym %s %s „za”, %s %s „przeciw”, %s %s „wstrzymujących się”\n" +
            "Przewodniczący stwierdził, że uchwała %s została przyjęta oraz nie złożono sprzeciw \n";
//    static String chairpersonResolutionTitle = "wyboru Przewodniczącego Zgromadzenia";
//    static String recorderResolutionTitle = "wyboru Protokolanta";
}
