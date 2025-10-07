package com.rohit.RideSharing.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.stereotype.Component;

@Component
@Entity
public class OfferRide {

    @Id
    @GeneratedValue
    private int offerId;

    private int userId;

    private String rideStartPoint;
    private String rideEndPoint;
    private String rideDate;
    private int  offerSeats;
    private int price;
    private int seatsAvailable;

    private int requestUserId ;
    private int requestId;

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public int getRequestUserId() {
        return requestUserId;
    }

    public void setRequestUserId(int requestUserId) {
        this.requestUserId = requestUserId;
    }

    public int getOfferId() {
        return offerId;
    }

    public void setOfferId(int offerId) {
        this.offerId = offerId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getRideStartPoint() {
        return rideStartPoint;
    }

    public void setRideStartPoint(String rideStartPoint) {
        this.rideStartPoint = rideStartPoint;
    }

    public String getRideEndPoint() {
        return rideEndPoint;
    }

    public void setRideEndPoint(String rideEndPoint) {
        this.rideEndPoint = rideEndPoint;
    }

    public String getRideDate() {
        return rideDate;
    }

    public void setRideDate(String rideDate) {
        this.rideDate = rideDate;
    }

    public int getOfferSeats() {
        return offerSeats;
    }

    public void setOfferSeats(int offerSeats) {
        this.offerSeats = offerSeats;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getSeatsAvailable() {
        return seatsAvailable;
    }

    public void setSeatsAvailable(int seatsAvailable) {
        this.seatsAvailable = seatsAvailable;
    }

    @Override
    public String toString() {
        return "RideController{" +
                "offerId=" + offerId +
                ", userId=" + userId +
                ", rideStartPoint='" + rideStartPoint + '\'' +
                ", rideEndPoint='" + rideEndPoint + '\'' +
                ", rideDate='" + rideDate + '\'' +
                ", offerSeats=" + offerSeats +
                ", price=" + price +
                ", seatsAvailable=" + seatsAvailable +
                '}';
    }
}
