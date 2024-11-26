package com.example.rest_service.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public record Patient(@JsonProperty("id") String id,
                      @JsonProperty("name") String name,
                      @JsonProperty("phone") String phone,
                      @JsonProperty("email") String email,
                      @JsonProperty("dateOfBirth") Date dateOfBirth,
                      @JsonProperty("address") String address,
                      @JsonProperty("insuranceCompany") String insuranceCompany,
                      @JsonProperty("passwordHash") String passwordHash) {
}
