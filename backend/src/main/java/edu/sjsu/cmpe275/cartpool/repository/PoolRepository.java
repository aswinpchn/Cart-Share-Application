package edu.sjsu.cmpe275.cartpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Pool;

import java.util.Optional;

public interface PoolRepository extends JpaRepository<Pool, String> {
    public Optional<Pool> findByNameAndPoolId(String name, String poolId);
}

