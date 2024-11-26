package com.example.rest_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class RoutesController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/user")
    public Greeting greeting(@RequestParam(value = "id") String name) {
        try {
            Connection c = Database.getConnection();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

    @GetMapping("/patients")
    public String getPatients() {
        try {
            Connection c = Database.getConnection();
            Statement s = c.createStatement();
            ResultSet r = s.executeQuery("SELECT BIN_TO_UUID(id) as uuid, name, phone, email FROM patients;");
            r.next();
            String str = r.getString(1)
                    + r.getString(2)
                    + r.getString(3)
                    + r.getString(4);
            return str;
        } catch (Exception e) {
            return e.toString();
        }
    }
}
