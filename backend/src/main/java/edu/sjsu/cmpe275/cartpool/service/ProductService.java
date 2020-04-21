package edu.sjsu.cmpe275.cartpool.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.cartpool.dto.Product;
import edu.sjsu.cmpe275.cartpool.dto.Store;
import edu.sjsu.cmpe275.cartpool.repository.ProductRepository;
import edu.sjsu.cmpe275.cartpool.repository.StoreRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRespository;
	
	@Autowired
	private StoreRepository storeRespository;
	
	public List<Product> getProductsByStore(long storeId) {
		Optional<Store> store = storeRespository.findById(storeId);
		if (store.isPresent()) {
			productRespository.findByStore(store.get());
		}
		return new ArrayList<>();
	}

}
