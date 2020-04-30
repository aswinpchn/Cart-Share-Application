package edu.sjsu.cmpe275.cartpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Pool;

import java.util.Optional;
import java.util.Set;

public interface PoolRepository extends JpaRepository<Pool, String> {
    public Optional<Pool> findByNameAndPoolId(String name, String poolId);
    public Pool findByName(String name);
    public Pool findByPoolId(String poolId);
    public Set<Pool> findByNameContainingOrNeighborhoodNameContainingOrZipContaining(String searchString1, String searchString2, String searchString3);
}

