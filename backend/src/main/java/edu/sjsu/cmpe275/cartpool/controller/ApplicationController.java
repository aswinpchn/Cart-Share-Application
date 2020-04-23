package edu.sjsu.cmpe275.cartpool.controller;

import java.util.List;

import edu.sjsu.cmpe275.cartpool.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import edu.sjsu.cmpe275.cartpool.service.ProductService;
import edu.sjsu.cmpe275.cartpool.service.StoreService;
import edu.sjsu.cmpe275.cartpool.service.UserService;

import javax.validation.Valid;

@Controller
@RequestMapping(path = "/cartpool")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

	@Autowired
	private UserService userService;

	@Autowired
	private StoreService storeService;

	@Autowired
	private ProductService productService;

	@GetMapping("/store/all")
	@ResponseBody
	public List<Store> getAllStores() {
		return storeService.getAllStores();
	}

	@GetMapping("/product/{storeId}")
	@ResponseBody
	public List<Product> getProducts(@PathVariable("storeId") long storeId) {
		return productService.getProductsByStore(storeId);
	}

	@GetMapping("/user")
	@ResponseBody
	public User getUserByEmail(@RequestParam String email) {
		return userService.getUserByEmail(email);
	}

	@PostMapping("/user/register")
	@ResponseBody
	public User createUser(@Valid @RequestBody CreateUserRequestBodyModel createUserRequestBody) {
		System.out.println("in api:    " + createUserRequestBody);
		User user = new User();
		Address address = new Address();
		if (createUserRequestBody.getUid() != null) {
			user.setUid(createUserRequestBody.getUid());
		} else {
			user.setPassword(createUserRequestBody.getPassword());
		}
		user.setEmail(createUserRequestBody.getEmail());
		user.setScreenName(createUserRequestBody.getScreenName());
		user.setNickName(createUserRequestBody.getNickName());
		user.setCreditScore(0);
		user.setVerified(false);
		address.setStreet(createUserRequestBody.getStreet());
		address.setCity(createUserRequestBody.getCity());
		address.setState(createUserRequestBody.getState());
		address.setZip(createUserRequestBody.getZip());
		user.setAddress(address);

		return userService.createUser(user);
	}

	@PostMapping("/user/updateProfile")
	@ResponseBody
	public User updateUserProfile(@Valid @RequestBody UpdateUserProfileRequestBodyModel request) {
		User user = new User();
		Address address = new Address();
		user.setEmail(request.getEmail());
		user.setScreenName(request.getScreenName());
		user.setNickName(request.getNickName());
		address.setStreet(request.getStreet());
		address.setCity(request.getCity());
		address.setState(request.getState());
		address.setZip(request.getZip());
		user.setAddress(address);
		return userService.createUser(user);
	}
}