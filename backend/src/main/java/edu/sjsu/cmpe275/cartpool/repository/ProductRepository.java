package edu.sjsu.cmpe275.cartpool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Product;
import edu.sjsu.cmpe275.cartpool.dto.Store;

public interface ProductRepository extends JpaRepository<Product, Long> {

	public List<Product> findByStore(Store store);
	
}
