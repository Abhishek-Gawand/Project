package cardeal.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cardeal.entities.Car;

@Repository
public interface CarDao extends JpaRepository<Car, Integer> {
	
	List<Car> findByCategoryId(int catid);
}
