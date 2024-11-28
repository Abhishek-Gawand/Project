package cardeal.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import cardeal.entities.Car;

public class ProductDTO {
	
	private int carid;
	private String cname;
	private int catid;
	private int qty;
	private int price;
	private String fueltype;
	private MultipartFile pic;
	
	public int getCarid() {
		return carid;
	}

	public void setCarid(int carid) {
		this.carid = carid;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public int getCatid() {
		return catid;
	}

	public void setCatid(int catid) {
		this.catid = catid;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getFueltype() {
		return fueltype;
	}

	public void setFueltype(String fueltype) {
		this.fueltype = fueltype;
	}

	public MultipartFile getPic() {
		return pic;
	}

	public void setPic(MultipartFile pic) {
		this.pic = pic;
	}

	public static Car toEntity(ProductDTO dto) {
		Car entity=new Car();
		BeanUtils.copyProperties(dto, entity, "pic");		
		return entity;
	}
}
