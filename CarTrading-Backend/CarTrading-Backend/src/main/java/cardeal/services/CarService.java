package cardeal.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import cardeal.entities.Car;

public interface CarService {
	void addCar(Car b,MultipartFile pic);
	void updateCar(Car b);
	void deleteCar(int id);
	List<Car> allCars();
	List<Car> categoryCars(int cat);
	Car findCarById(int prodid);
	List<Car> allCarAvailable();
}
