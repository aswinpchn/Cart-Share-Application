package edu.sjsu.cmpe275.cartpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {
	public boolean existsById(long id);

	public boolean existsByName(String name);

	public Store findStoreByName(String name);

}
