package edu.sjsu.cmpe275.cartpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
