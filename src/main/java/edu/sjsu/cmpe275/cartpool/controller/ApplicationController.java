package edu.sjsu.cmpe275.cartpool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.sjsu.cmpe275.cartpool.dto.User;
import edu.sjsu.cmpe275.cartpool.repository.UserRepository;

@Controller
@RequestMapping(path = "/cartpool")
public class ApplicationController {

	@Autowired
	private UserRepository userRepository;

	@PostMapping("/user")
	@ResponseBody
	public User createUser() {
		User user = new User();
		return userRepository.save(user);
	}
}