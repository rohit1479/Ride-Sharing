package com.rohit.RideSharing.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RequestMappingOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int requestId;
    int offerId;
    int offerUserId;
    int requestUserId;

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public int getOfferId() {
        return offerId;
    }

    public void setOfferId(int offerId) {
        this.offerId = offerId;
    }

    public int getOfferUserId() {
        return offerUserId;
    }

    public void setOfferUserId(int offerUserId) {
        this.offerUserId = offerUserId;
    }

    public int getRequestUserId() {
        return requestUserId;
    }

    public void setRequestUserId(int requestUserId) {
        this.requestUserId = requestUserId;
    }
}
