package edu.sjsu.cmpe275.cartpool.repository;

import edu.sjsu.cmpe275.cartpool.dto.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Store;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    public Optional<Store> findStoreById(long storeId);
}
