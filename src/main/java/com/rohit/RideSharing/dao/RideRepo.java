package com.rohit.RideSharing.dao;

import com.rohit.RideSharing.model.OfferRide;
import com.rohit.RideSharing.model.RequestMappingOffer;
import com.rohit.RideSharing.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RideRepo {
    @Autowired
    JdbcTemplate  jdbcTemplate;

    public OfferRide saveOfferRide(OfferRide offerRide) {
        System.out.println("inside save offer ride repo");

        String sql="insert into offerride(userId,rideStartPoint,rideEndPoint,rideDate,offerSeats,price,seatsAvailable)values(?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql,offerRide.getUserId(),offerRide.getRideStartPoint(),offerRide.getRideEndPoint(),offerRide.getRideDate(),offerRide.getOfferSeats(),offerRide.getPrice(),offerRide.getSeatsAvailable());

        return offerRide;

    }

    public List<OfferRide> userOfferRide(User user) {

        String sql="select * from offerRide where userid=?";


        List<OfferRide> offerRideList =jdbcTemplate.query(sql,new BeanPropertyRowMapper(OfferRide.class),user.getUserId());
        return offerRideList;
    }

    public List<OfferRide> findRide(OfferRide offerRide) {
        String sql="select * from offerRide where rideStartPoint=? AND rideEndPoint=? AND rideDate=? AND seatsAvailable>0";
        List<OfferRide> offerRideList =jdbcTemplate.query(sql,new BeanPropertyRowMapper(OfferRide.class),offerRide.getRideStartPoint(),offerRide.getRideEndPoint(),offerRide.getRideDate());
        return offerRideList;

    }

    public void acceptRide(RequestMappingOffer rmo) {
        String sql1="insert into rmo (offerId,offerUserID,requestUserId) values(?,?,?)";
        String sql2="update offerRide set seatsAvailable=seatsAvailable-1 where offerId=?";

        jdbcTemplate.update(sql1,rmo.getOfferId(),rmo.getOfferUserId(),rmo.getRequestUserId());
        jdbcTemplate.update(sql2,rmo.getOfferId());


    }
}
