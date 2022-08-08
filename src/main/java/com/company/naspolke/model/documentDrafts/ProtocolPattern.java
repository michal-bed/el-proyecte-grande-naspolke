package com.company.naspolke.model.documentDrafts;

import org.springframework.stereotype.Component;

@Component
class ProtocolPattern {
    static String ResolutionPattern = "Uchwała nr %s \n" +
            "%s  Zgromadzenia Wspólników %s z siedzibą %s\n" +
            "z dnia %s \n" +
            "w sprawie %s\n";

    static String ResolutionChairpersonText = "%s Zgromadzenie Wspólników pod firmą %s " +
            "z siedzibą %s postanawia, że zgromadzeniu przewodniczyć będzie %s %s.";
//    static String chairpersonResolutionTitle = "wyboru Przewodniczącego Zgromadzenia";
//    static String recorderResolutionTitle = "wyboru Protokolanta";
}
