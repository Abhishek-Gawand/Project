package cardeal.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import cardeal.entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Integer> {

}
