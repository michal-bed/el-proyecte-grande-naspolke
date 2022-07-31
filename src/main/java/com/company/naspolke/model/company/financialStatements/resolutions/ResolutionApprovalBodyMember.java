package com.company.naspolke.model.company.financialStatements.resolutions;

import com.company.naspolke.model.company.companyBodies.BoardMember;
import com.company.naspolke.model.company.companyBodies.BoardOfDirector;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ResolutionApprovalBodyMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String votingType;
    private String resolutionTitle;
    private boolean unanimously;
    private int votesFor;
    private int votesAgainst;
    private int votesAbstentions;
    private String bodyType;
    @ManyToOne
    @JoinColumn(name = "board_member_board_member_id")
    private BoardMember boardMember;
    @ManyToOne
    @JoinColumn(name = "director_board_of_director_id")
    private BoardOfDirector director;
    private boolean wholeReportingPeriod;
    private LocalDate beginningOfReportingPeriod;
    private LocalDate endOfReportingPeriod;
}
