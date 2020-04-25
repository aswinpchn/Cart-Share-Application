package edu.sjsu.cmpe275.cartpool.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.cartpool.dto.Product;
import edu.sjsu.cmpe275.cartpool.dto.Store;
import edu.sjsu.cmpe275.cartpool.repository.ProductRepository;
import edu.sjsu.cmpe275.cartpool.repository.StoreRepository;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRespository;
	
	@Autowired
	private StoreRepository storeRespository;
	
	public List<Product> getProductsByStore(long storeId) {
		Optional<Store> store = storeRespository.findById(storeId);
		if (store.isPresent()) {
			return productRespository.findByStore(store.get());
		}
		return new ArrayList<>();
	}

	public Product createProduct(Product product) {
		Optional<Product> productExists = productRespository.findProductByStoreAndSku(product.getStore(), product.getSku());
		if(productExists.isPresent()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Product already exists with same store and sku");
		}
		return productRespository.save(product);
	}

	public Product editProduct(Product product) {
		Optional<Product> productExists = productRespository.findById(product.getId());
		if(productExists.isPresent()) {
			Product currentProduct = productExists.get();
			product.setStore(currentProduct.getStore());
			product.setSku(currentProduct.getSku());
			return productRespository.save(product);
		}
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
	}
}
