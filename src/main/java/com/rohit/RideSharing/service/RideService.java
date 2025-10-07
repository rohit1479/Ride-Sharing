package com.rohit.RideSharing.service;

import com.rohit.RideSharing.dao.RideRepo;
import com.rohit.RideSharing.model.OfferRide;
import com.rohit.RideSharing.model.RequestMappingOffer;
import com.rohit.RideSharing.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideService {

    @Autowired
    RideRepo repo;
    public OfferRide saveOfferRide(OfferRide offerRide) {
        System.out.println("inside save offer ride service");
        return repo.saveOfferRide(offerRide);


    }

    public List<OfferRide> userOfferRide(User user) {
        return repo.userOfferRide(user);
    }

    public List<OfferRide> findRide(OfferRide offerRide) {
        return repo.findRide(offerRide);
    }

    public void acceptRide(RequestMappingOffer rmo) {

        repo.acceptRide(rmo);
    }
}
