package edu.sjsu.cmpe275.cartpool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.cartpool.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

}
