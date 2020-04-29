package edu.sjsu.cmpe275.cartpool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.cartpool.dto.*;
import edu.sjsu.cmpe275.cartpool.repository.PoolRepository;
import edu.sjsu.cmpe275.cartpool.repository.UserRepository;

import java.util.Optional;

@Service
public class PoolService {

    @Autowired
    private PoolRepository poolRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Pool createPool(Pool pool) {
        Optional<Pool> poolExists = poolRepository.findByNameAndPoolId(pool.getName(), pool.getPoolId());

        if (poolExists.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Pool already exists with same pool id or name");
        }

        Optional<User> leader = userRepository.findById(pool.getLeader().getId());
        User user = leader.get();
        user.setPoolId(pool.getPoolId());
        userRepository.save(user);

        return poolRepository.save(pool);
    }
}
