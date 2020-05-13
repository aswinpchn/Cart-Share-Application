package edu.sjsu.cmpe275.cartpool.repository;
import java.util.List;
import java.util.Optional;
import edu.sjsu.cmpe275.cartpool.dto.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Store;


public interface StoreRepository extends JpaRepository<Store, Long> {
	public boolean existsById(long id);
   public Optional<Store> findStoreById(long storeId);

	public boolean existsByName(String name);

	public Store findStoreByName(String name);

	public List<Store> findStoresByAvailable(boolean status);

}
