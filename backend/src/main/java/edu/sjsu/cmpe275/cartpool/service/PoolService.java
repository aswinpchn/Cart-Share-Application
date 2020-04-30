package edu.sjsu.cmpe275.cartpool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.cartpool.dto.*;
import edu.sjsu.cmpe275.cartpool.repository.PoolRepository;
import edu.sjsu.cmpe275.cartpool.repository.PoolRequestRepository;
import edu.sjsu.cmpe275.cartpool.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PoolService {

	@Autowired
	private PoolRepository poolRepository;

	@Autowired
	private PoolRequestRepository poolRequestRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailService emailService;

	@Transactional
	public Pool createPool(Pool pool) {
		Optional<Pool> poolExists = poolRepository.findByNameAndPoolId(pool.getName(), pool.getPoolId());

		if (poolExists.isPresent()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Pool already exists with same pool id or name");
		}

		Optional<User> leader = userRepository.findById(pool.getLeaderId());
		User user = leader.get();
		user.setPoolId(pool.getPoolId());
		userRepository.save(user);

		return poolRepository.save(pool);
	}

	@Transactional
	public String joinPool(JoinPoolRequestBodyModel modelRequest) {
		String poolName = modelRequest.getPoolName();
		String userScreenName = modelRequest.getUserScreenName();
		String referrerScreenName = modelRequest.getReferrerScreenName();
		
		User newPooler = userRepository.findByScreenName(userScreenName);
		if (newPooler.getPoolId() != null || !newPooler.getPoolId().isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot join more than one pool at a time");
		}
		
		User referrer = userRepository.findByScreenName(referrerScreenName);
		String referrerPoolId = referrer.getPoolId();
		Pool pool = poolRepository.findByName(poolName);
		if (!(referrerPoolId.equals(pool.getPoolId()))) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"Invalid referrer. The referrer does not belong to the pool");
		}
		PoolRequest poolRequest = new PoolRequest();
		poolRequest.setPoolName(poolName);
		poolRequest.setUserScreenName(userScreenName);
		poolRequest.setReferrerName(referrerScreenName);
		poolRequest.setStatus("Pending");
		poolRequestRepository.save(poolRequest);
		emailService.sendEmailToPoolReferrer(referrer.getEmail(), poolRequest);
		return "Thank you for applying for pool. Please wait while we approve your request!";
	}

	@Transactional
	public List<PoolRequest> getPoolRequests(String referrerScreenName) {
		return poolRequestRepository.findByReferrerScreenName(referrerScreenName);
	}

	@Transactional
	public List<PoolRequest> getPoolRequestsForLeader(String leaderScreenName) {
		return poolRequestRepository.findByLeaderScreenName(leaderScreenName);
	}

	@Transactional
	public String approveReferralRequest(long requestId) {
		PoolRequest poolRequest = poolRequestRepository.findById(requestId).get();
		String poolName = poolRequest.getPoolName();
		Pool pool = poolRepository.findByName(poolName);
		Optional<User> leader = userRepository.findById(pool.getLeaderId());
		User newPooler = userRepository.findByScreenName(poolRequest.getUserScreenName());
		if (newPooler.getPoolId() != null || !newPooler.getPoolId().isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot join more than one pool at a time");
		}
		if (poolRequest.getReferrerScreenName().equals(leader.get().getScreenName())) {
			newPooler.setPoolId(pool.getPoolId());
			userRepository.save(newPooler);
			poolRequest.setStatus("Approved");
			poolRequestRepository.save(poolRequest);
			return "Thank you. The user is now a member of the pool";
		} else {
			poolRequest.setLeaderScreenName(leader.get().getScreenName());
			poolRequest.setStatus("Pending_Leader_Approval");
			poolRequestRepository.save(poolRequest);
			emailService.sendEmailToPoolLeader(leader.get().getEmail(), poolRequest);
			return "Thank you for approving your referral. Please wait for pool leader to approve the request";
		}
	}

	@Transactional
	public String rejectJoinRequest(long requestId) {
		PoolRequest poolRequest = poolRequestRepository.findById(requestId).get();
		poolRequest.setStatus("Rejected");
		poolRequestRepository.save(poolRequest);
		return "Thank you. The join request is rejected";
	}

	@Transactional
	public String approveJoinRequestForLeader(long requestId) {
		PoolRequest poolRequest = poolRequestRepository.findById(requestId).get();
		User newPooler = userRepository.findByScreenName(poolRequest.getUserScreenName());
		if (newPooler.getPoolId() != null || !newPooler.getPoolId().isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot join more than one pool at a time");
		}
		String poolName = poolRequest.getPoolName();
		Pool pool = poolRepository.findByName(poolName);
		newPooler.setPoolId(pool.getPoolId());
		return "Thank you. The user is now a member of the pool";
	}
}
