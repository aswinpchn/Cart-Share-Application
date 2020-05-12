package edu.sjsu.cmpe275.cartpool.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Product;
import edu.sjsu.cmpe275.cartpool.dto.Store;

public interface ProductRepository extends JpaRepository<Product, Long> {

	public List<Product> findByStoreAndAvailable(Store store, Boolean isAvailable);
	public Optional<Product> findProductByStoreAndSkuAndAvailable(Store store, long sku, Boolean isAvailable);
	public Set<Product> findBySkuAndAvailable(Long sku, Boolean isAvailable);
	public Set<Product> findByNameContainingAndAvailable(String name, Boolean isAvailable);
	public Optional<Product> findByIdAndAvailable(long id, Boolean isAvailable);
}
