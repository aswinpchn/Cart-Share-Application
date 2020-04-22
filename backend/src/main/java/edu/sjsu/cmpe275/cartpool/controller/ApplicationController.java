package edu.sjsu.cmpe275.cartpool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import edu.sjsu.cmpe275.cartpool.dto.Product;
import edu.sjsu.cmpe275.cartpool.dto.Store;
import edu.sjsu.cmpe275.cartpool.dto.User;
import edu.sjsu.cmpe275.cartpool.dto.Address;
import edu.sjsu.cmpe275.cartpool.service.ProductService;
import edu.sjsu.cmpe275.cartpool.service.StoreService;
import edu.sjsu.cmpe275.cartpool.service.UserService;

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
    @PostMapping("/user/register")
    @ResponseBody
    public void createUser(@RequestBody User userBody) {
        System.out.println("in api"+ userBody);
//        User user = new User();
//        Address address = new Address();
//        if(uid != null) {
//            user.setUid(uid);
//        } else {
//            user.setPassword(password);
//        }
//        user.setEmail(email);
//        user.setScreenName(screenName);
//        user.setNickName(nickName);
//        user.setCreditScore(0);
//        user.setVerified(false);
//        address.setStreet(street);
//        address.setCity(city);
//        address.setState(state);
//        address.setZip(zip);
//        user.setAddress(address);
//        return userService.createUser(user);
    }
}