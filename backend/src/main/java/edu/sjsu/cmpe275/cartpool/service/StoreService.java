package edu.sjsu.cmpe275.cartpool.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.cartpool.dto.Store;
import edu.sjsu.cmpe275.cartpool.repository.StoreRepository;

@Service
public class StoreService {

	@Autowired
	private StoreRepository storeRepository;

	public List<Store> getAllStores() {
		return storeRepository.findAll();
	}

	@Transactional
	public Store createStore(Store store) {
		if (storeRepository.existsByName(store.getName())) {
			Store existingStore = storeRepository.findStoreByName(store.getName());
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Store already exists");
		}
		return storeRepository.save(store);
	}

	@Transactional
	public Store updateStore(Store store) {
		Store existingStore = storeRepository.findStoreByName(store.getName());
		if (existingStore == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found");
		}
		existingStore.setAddress(store.getAddress());
		Store response = storeRepository.save(existingStore);
		return response;
	}

	@Transactional
	public Store deleteStore(long storeId) {
		Optional<Store> existingStore = storeRepository.findById(storeId);
		if (!existingStore.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found");
		}
		storeRepository.deleteById(storeId);
		return existingStore.get();
	}

}
