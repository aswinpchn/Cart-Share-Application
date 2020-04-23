package edu.sjsu.cmpe275.cartpool.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.cartpool.repository.UserRepository;
import edu.sjsu.cmpe275.cartpool.dto.User;
import edu.sjsu.cmpe275.cartpool.dto.Address;

@Service
public class UserService {
	String POOLER_ROLE = "pooler";
	String ADMIN_ROLE = "admin";
	String DOMAIN = "sjsu.edu";

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public User createUser(User user) {
//		performValidations(user);
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "User with same email address already exists");
		}

		String email = user.getEmail();
		String domain = email.substring(email .indexOf("@") + 1);
		if(domain.equals(DOMAIN)) {
			user.setRole(ADMIN_ROLE);
		} else {
			user.setRole(POOLER_ROLE);
		}
		return userRepository.save(user);
	}
	
	@Transactional
	public User updateUserProfile(User user) {
		User existingUser = userRepository.findByEmail(user.getEmail());
		if (existingUser == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
		}
		existingUser.setAddress(user.getAddress());
		existingUser.setNickName(user.getNickName());
		existingUser.setScreenName(user.getScreenName());
		return userRepository.save(existingUser);
	}
	
	@Transactional
	public User getUserByEmail(String email) {
		System.out.println(email);
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
		}
		return user;
	}
	
	private void performValidations(User user) {
//		if (player.getFirstname().isEmpty() || player.getLastname().isEmpty() || player.getEmail().isEmpty()) {
//			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Empty parameter found");
//		}
	}
}
