package com.rohit.RideSharing.dao;


import com.rohit.RideSharing.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepo {

    @Autowired
    JdbcTemplate jdbcTemplate;
   // private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User saveUser(User user) {
       // String hashedPassword = passwordEncoder.encode(user.getUserPassword());
        try {
            System.out.println("in user repo");
            String sql = "insert into user (name,email,contact,username,userpassword) values(?,?,?,?,?)";


            jdbcTemplate.update(sql, user.getName(), user.getEmail(), user.getContact(), user.getUserName(), user.getUserPassword());
            return user;
        } catch (Exception e) {
            System.out.println("Exception in saveUser");
            e.printStackTrace();
            return null;
        }


    }

    public User checkUser(String email, String userPassword) {
      //  String hashedPassword = passwordEncoder.encode(userPassword);
        try {

            String sql = "Select * from user where email=? ";

            User user = (User) jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper(User.class), email);
            System.out.println(user);
            System.out.println(email + " " + userPassword);
            if (user != null && user.getUserPassword().equals(userPassword)) return user;
            else return null;


        } catch (Exception e) {
            System.out.println("Exception in checkUser");
            e.printStackTrace();

        }
        return null;

    }

    public User updateUser(User user) {
      //  String hashedPassword = passwordEncoder.encode(user.getUserPassword());

        try {
            String sqlUpdate = "update users SET name = ?,email = ? ,contact = ? ,UserName=?, UserPassword = ? WHERE userId = ?  ";
            jdbcTemplate.update(sqlUpdate, user.getName(), user.getEmail(), user.getContact(), user.getUserName(), user.getUserPassword(), user.getUserId());
            return user;
        } catch (Exception e) {
            System.out.println("Exception in editUser");
            e.printStackTrace();

        }
        return null;
    }



}