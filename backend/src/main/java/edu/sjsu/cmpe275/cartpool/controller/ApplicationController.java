package edu.sjsu.cmpe275.cartpool.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.sjsu.cmpe275.cartpool.Constants;
import edu.sjsu.cmpe275.cartpool.dto.Address;
import edu.sjsu.cmpe275.cartpool.dto.CreateStoreRequestBodyModel;
import edu.sjsu.cmpe275.cartpool.dto.CreateUserRequestBodyModel;
import edu.sjsu.cmpe275.cartpool.dto.Product;
import edu.sjsu.cmpe275.cartpool.dto.Store;
import edu.sjsu.cmpe275.cartpool.dto.UpdateStoreRequestBodyModel;
import edu.sjsu.cmpe275.cartpool.dto.UpdateUserProfileRequestBodyModel;
import edu.sjsu.cmpe275.cartpool.dto.User;
import edu.sjsu.cmpe275.cartpool.service.ProductService;
import edu.sjsu.cmpe275.cartpool.service.StoreService;
import edu.sjsu.cmpe275.cartpool.service.UserService;

@Controller
@RequestMapping(path = "/cartpool")
@CrossOrigin(origins = Constants.BACKEND_URL)
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

	@GetMapping("/user/verify")
	@ResponseBody
	public String verifyUser(@RequestParam String email, @RequestParam int code) {
		return userService.verifyUser(email, code);
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
		return userService.updateUserProfile(user);
	}

	@PostMapping("/user/register")
	@ResponseBody
	public User createUser(@Valid @RequestBody CreateUserRequestBodyModel createUserRequestBody) {
		System.out.println("in api:    " + createUserRequestBody);
		User user = new User();
		if (createUserRequestBody.getPassword() != null) {
			user.setPassword(createUserRequestBody.getPassword());
		}
		user.setEmail(createUserRequestBody.getEmail());
		user.setUid(createUserRequestBody.getUid());

		return userService.createUser(user);
	}

	@PostMapping("/store/create")
	@ResponseBody
	public Store createStore(@Valid @RequestBody CreateStoreRequestBodyModel createStoreRequestBody) {
		System.out.println("in api:    " + createStoreRequestBody);
		Store store = new Store();
		Address address = new Address();
		store.setName(createStoreRequestBody.getName());
		address.setStreet(createStoreRequestBody.getStreet());
		address.setCity(createStoreRequestBody.getCity());
		address.setState(createStoreRequestBody.getState());
		address.setZip(createStoreRequestBody.getZip());
		store.setAddress(address);
		return storeService.createStore(store);
	}

	@PostMapping("/store/updateStore")
	@ResponseBody
	public Store updateStore(@Valid @RequestBody UpdateStoreRequestBodyModel request) {
		System.out.println("in api:    " + request);
		Store store = new Store();
		Address address = new Address();
		store.setName(request.getName());
		address.setStreet(request.getStreet());
		address.setCity(request.getCity());
		address.setState(request.getState());
		address.setZip(request.getZip());
		store.setAddress(address);
		return storeService.updateStore(store);
	}

	@DeleteMapping("/store/{id}")
	@ResponseBody
	public Store deleteStore(@PathVariable(required = true) long id) {
		System.out.println("in api deleteStore:" + id);
		return storeService.deleteStore(id);
	}

}