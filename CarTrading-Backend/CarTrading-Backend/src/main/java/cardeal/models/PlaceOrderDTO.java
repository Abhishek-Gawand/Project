package cardeal.models;

import java.util.List;

import cardeal.entities.Address;
import cardeal.entities.Payment;

public class PlaceOrderDTO {

	private Address address;
	private int car;
	private Payment payment;
	private int customerid;
	
	public int getCustomerid() {
		return customerid;
	}
	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}

	public int getCar() {
		return car;
	}
	public void setCar(int car) {
		this.car = car;
	}
	public Payment getPayment() {
		return payment;
	}
	public void setPayment(Payment payment) {
		this.payment = payment;
	}
	
	
}
