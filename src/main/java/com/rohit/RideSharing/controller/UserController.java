package com.rohit.RideSharing.controller;

import com.rohit.RideSharing.model.User;
import com.rohit.RideSharing.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/addUser")
    public User saveUser(@RequestBody User user, HttpSession session){
        session.setAttribute("User",user);
        System.out.println("in controler");
        System.out.println(user);
        return service.addUser(user);
    }

    @PostMapping("/editUser")
    public User editUser(@RequestBody User user, HttpServletRequest request, HttpSession session, HttpServletResponse response ){
        try {
            System.out.println(user);
            User currUser=(User)session.getAttribute("User");
            user.setUserId(currUser.getUserId());
            User currentUser=service.updateUser(user);
            if(currentUser!=null)
            {
                System.out.println("Successfully edited the user");
                //	session.setAttribute("User", usr);
                session.setAttribute("User",currentUser);

                return currentUser;
            }
            else
                System.out.println("Error while editing the user");


        }
        catch (Exception e) {
            System.out.println("Error while editing user Controller");
            e.printStackTrace();

        }

        return null;
    }

    @PostMapping("/login")
    public User authenticateUserLogin(@RequestBody  User user , HttpSession session){
        User loginUser=service.checkUser(user.getEmail(),user.getUserPassword());
        if(loginUser!=null){
            session.setAttribute("User",loginUser);
        }else{
            System.out.println("Invalid User name / password");

        }
        return loginUser;
    }


    @GetMapping("/userProfile")
    public User userProfile(HttpSession session){
        User currentUser=(User)session.getAttribute("User");
        return currentUser;
    }


    @RequestMapping("/logout")
    public void logout(HttpSession session){
        session.removeAttribute("User");
    }









}
