package edu.sjsu.cmpe275.cartpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    public boolean existsUserByUidOrEmail(String uid, String email);
    public User findUserByEmail(String email);
    public boolean existsByEmail(String email);
    public User findByEmail(String email);
    public User findByScreenName(String screenName);
    public List<User> findAllByPoolId(String poolId);
}
