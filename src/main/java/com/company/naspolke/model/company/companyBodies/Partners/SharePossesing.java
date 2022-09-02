package com.company.naspolke.model.company.companyBodies.Partners;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;


@Component
public interface SharePossesing {
    BigDecimal getSharesValue();
    Integer getSharesCount();
}
