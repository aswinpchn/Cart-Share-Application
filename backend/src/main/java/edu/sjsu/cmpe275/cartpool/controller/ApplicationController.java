package edu.sjsu.cmpe275.cartpool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.sjsu.cmpe275.cartpool.dto.Store;
import edu.sjsu.cmpe275.cartpool.service.StoreService;
import edu.sjsu.cmpe275.cartpool.service.UserService;

@Controller
@RequestMapping(path = "/cartpool")
public class ApplicationController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private StoreService storeService;
	
	@GetMapping("/store/all")
	@ResponseBody
	public List<Store> getAllStores() {
		return storeService.getAllStores();
	}
}