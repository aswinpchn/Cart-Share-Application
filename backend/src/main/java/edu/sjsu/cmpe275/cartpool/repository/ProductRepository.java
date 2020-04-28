package edu.sjsu.cmpe275.cartpool.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Product;
import edu.sjsu.cmpe275.cartpool.dto.Store;

public interface ProductRepository extends JpaRepository<Product, Long> {

	public List<Product> findByStore(Store store);
	public Optional<Product> findProductByStoreAndSku(Store store, long sku);
	public Set<Product> findBySku(Long sku);
	public Set<Product> findByNameContaining(String name);

}
