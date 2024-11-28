package cardeal.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cardeal.entities.Car;
import cardeal.models.ProductDTO;
import cardeal.models.Response;
import cardeal.services.CarService;
import cardeal.services.CategoryService;

@CrossOrigin
@RestController
@RequestMapping("/api/cars")
public class CarsController {
	@Autowired CarService bservice;
	@Autowired CategoryService cservice;
	
	@PostMapping
	public ResponseEntity<?> saveBook(ProductDTO dto) {
		System.out.println(dto);
		Car car=ProductDTO.toEntity(dto);
		car.setCategory(cservice.findById(dto.getCatid()));
		bservice.addCar(car,dto.getPic());
		return Response.success(car);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateBook(@RequestBody Car car,@PathVariable("id") int id) {
		bservice.updateCar(car);
		return Response.success(car);		
	}
	
	@GetMapping("{id}")
	public Car findBook(@PathVariable("id")int id) {
		Car book=bservice.findCarById(id);
		return book;
	}
	
	@GetMapping
	public List<Car> findAllProducts() {
		List<Car> result = new ArrayList<Car>();
		for(Car b : bservice.allCars()) {
			result.add(b);
		}
		return result;
	}
	
	@GetMapping("/available")
	public List<Car> findAvailableCars() {
		return bservice.allCarAvailable();
	}
	
	@GetMapping("cats")
	public List<Car> findByCategory(int cat) {
		List<Car> result = new ArrayList<Car>();
		for(Car b : bservice.categoryCars(cat)) {
			result.add(b);
		}
		return result;
	}
		
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable("id") int id) {
		bservice.deleteCar(id);
		return Response.status(HttpStatus.OK);
	}
}
