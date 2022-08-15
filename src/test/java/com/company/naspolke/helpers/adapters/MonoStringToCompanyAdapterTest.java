package com.company.naspolke.helpers.adapters;

import com.company.naspolke.model.company.Company;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class MonoStringToCompanyAdapterTest {

    private MonoStringToCompanyAdapter companyAdapter;
    private String EASYSOLAR_MOCK;

    @BeforeEach
    void setUpBeforeEach(){
//        companyAdapter = new MonoStringToCompanyAdapter();

    }
    @Test
    void getCompany() {
    }

    @Test
    @DisplayName("check for proper format from 40000 number as string")
    void getSharesValueFromApiData() {
        String expected = "40000";
        String sut1 = companyAdapter.getSharesValueFromApiData("4.0000,00");
        String sut2 = companyAdapter.getSharesValueFromApiData("40 000,00");
        assertEquals(expected, sut1);
        assertEquals(expected, sut2);
    }
}