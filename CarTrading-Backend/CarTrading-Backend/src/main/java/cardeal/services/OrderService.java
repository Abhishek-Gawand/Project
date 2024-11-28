package cardeal.services;

import java.util.List;

import cardeal.entities.Customer;
import cardeal.entities.Order;

public interface OrderService {

	Order saveOrder(Order order);
	List<Order> getAllOrders();
	List<Order> getCustomerOrders(Customer customer);
	Order findById(int id);
}
