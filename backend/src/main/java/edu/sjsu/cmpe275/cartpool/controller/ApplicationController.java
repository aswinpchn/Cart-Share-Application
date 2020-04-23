package edu.sjsu.cmpe275.cartpool.controller;

import java.util.List;

import edu.sjsu.cmpe275.cartpool.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import edu.sjsu.cmpe275.cartpool.service.ProductService;
import edu.sjsu.cmpe275.cartpool.service.StoreService;
import edu.sjsu.cmpe275.cartpool.service.UserService;
import edu.sjsu.cmpe275.cartpool.Constants;

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
        System.out.println("in api:    "+ createUserRequestBody);
        User user = new User();
        if(createUserRequestBody.getPassword() != null) {
            user.setPassword(createUserRequestBody.getPassword());
        }
        user.setEmail(createUserRequestBody.getEmail());
        user.setUid(createUserRequestBody.getUid());

        return userService.createUser(user);
    }
}