package edu.sjsu.cmpe275.cartpool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.PoolRequest;

public interface PoolRequestRepository extends JpaRepository<PoolRequest, Long> {
	public List<PoolRequest> findByReferrerScreenName(String referrerScreenName);
}
