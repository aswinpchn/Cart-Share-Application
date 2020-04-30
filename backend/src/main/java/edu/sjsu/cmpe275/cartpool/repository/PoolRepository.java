package edu.sjsu.cmpe275.cartpool.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Pool;

public interface PoolRepository extends JpaRepository<Pool, String> {
	public Optional<Pool> findByNameAndPoolId(String name, String poolId);

	public Pool findByName(String name);

	public Optional<Pool> findByLeaderId(long leaderId);
}
