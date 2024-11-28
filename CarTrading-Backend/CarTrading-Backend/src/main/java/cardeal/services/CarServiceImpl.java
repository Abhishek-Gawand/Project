package cardeal.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cardeal.daos.CarDao;
import cardeal.entities.Car;
import cardeal.utils.StorageService;

@Service
public class CarServiceImpl implements CarService {

	@Autowired private StorageService storageService;
	@Autowired private CarDao dao;
	@Override
	public void addCar(Car b, MultipartFile pic) {
		// TODO Auto-generated method stub
		String photo=storageService.store(pic);
		b.setPhoto(photo);
		dao.save(b);
	}

	@Override
	public void updateCar(Car b) {
		// TODO Auto-generated method stub
		dao.save(b);
	}

	@Override
	public void deleteCar(int id) {
		// TODO Auto-generated method stub
		Car entity=dao.getById(id);
		dao.delete(entity);
	}

	@Override
	public List<Car> allCars() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public List<Car> categoryCars(int cat) {
		return dao.findByCategoryId(cat).stream().filter(b->b.getQty()>0).collect(Collectors.toList());
	}

	@Override
	public Car findCarById(int prodid) {
		// TODO Auto-generated method stub
		return dao.getById(prodid);
	}

	@Override
	public List<Car> allCarAvailable() {
		// TODO Auto-generated method stub
		return dao.findAll().stream().filter(b->b.getQty()>0).collect(Collectors.toList());
	}

}
