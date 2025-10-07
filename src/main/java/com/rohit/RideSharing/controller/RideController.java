package com.rohit.RideSharing.controller;


import com.rohit.RideSharing.model.OfferRide;
import com.rohit.RideSharing.model.RequestMappingOffer;
import com.rohit.RideSharing.model.User;
import com.rohit.RideSharing.service.RideService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RideController {

    @Autowired
    RideService service;

    @PostMapping("/offerRide")
    public OfferRide saveOfferRide(@RequestBody OfferRide offerRide, HttpSession session){
        System.out.println(offerRide);
        try{
            System.out.println("inside Save Offer Ride controller");
            User user= (User)session.getAttribute("User");
            offerRide.setUserId(user.getUserId());
            offerRide.setSeatsAvailable(offerRide.getOfferSeats());

            return service.saveOfferRide(offerRide);


        }
        catch (Exception e) {
            e.printStackTrace();
            return null;

        }
    }

    @GetMapping("/userOfferRide")
    public List<OfferRide> usersOfferRide(HttpSession session){
        User user=(User)session.getAttribute("User");
        return service.userOfferRide(user);


    }
    @PostMapping("/findRide")
    public List<OfferRide> findRide(@RequestBody OfferRide offerRide){
       return  service.findRide(offerRide);
    }

    @PostMapping("/acceptRide")
    public void acceptRide(@RequestBody OfferRide offerRide,HttpSession session){
        try{

            User user= (User)session.getAttribute("User");
            RequestMappingOffer rmo=new RequestMappingOffer();
            rmo.setOfferId(offerRide.getOfferId());
            rmo.setOfferUserId(offerRide.getUserId());
            rmo.setRequestUserId(user.getUserId());

            service.acceptRide(rmo);

        }
        catch (Exception e) {
            e.printStackTrace();
            return;

        }


    }



}
