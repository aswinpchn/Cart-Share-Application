package edu.sjsu.cmpe275.cartpool.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.cartpool.dto.Store;
import edu.sjsu.cmpe275.cartpool.repository.StoreRepository;

@Service
public class StoreService {
	
	@Autowired
	private StoreRepository storeRespository;
	
	public List<Store> getAllStores() {
		return storeRespository.findAll();
	}

}
