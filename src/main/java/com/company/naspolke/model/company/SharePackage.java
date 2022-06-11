package com.company.naspolke.model.company;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

@Data
@Entity
@NoArgsConstructor
public class SharePackage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private BigDecimal shareValue;
    private Integer shareCount;

    @Builder
    public SharePackage(BigDecimal shareValue, Integer shareCount) {
        this.shareValue = shareValue;
        this.shareCount = shareCount;
    }
}
