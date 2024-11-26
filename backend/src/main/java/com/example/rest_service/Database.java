package com.example.rest_service;

import java.sql.*;

public class Database {
    private static Connection connection = null;

    public static void initializeConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/groupProject";
        String user = "root";
        String password = "";
        connection = DriverManager.getConnection(url, user, password);
    }

    public static Connection getConnection() throws Exception {
        if (connection == null) initializeConnection();

        return connection;
    }

    public static void addPatient() throws SQLException {
        if (connection == null) initializeConnection();

    }
}
