package com.rohit.RideSharing.service;

import com.rohit.RideSharing.dao.UserRepo;
import com.rohit.RideSharing.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    public User addUser(User user){
        System.out.println("in service");
        return repo.saveUser(user);


    }

    public User checkUser(String email, String userPassword) {
        return repo.checkUser(email,userPassword);

    }

    public User updateUser(User user) {
        return repo.updateUser(user);
    }
}
