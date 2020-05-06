package edu.sjsu.cmpe275.cartpool.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.cartpool.Constants;
import edu.sjsu.cmpe275.cartpool.dto.JoinPoolRequestBodyModel;
import edu.sjsu.cmpe275.cartpool.dto.Order;
import edu.sjsu.cmpe275.cartpool.dto.Pool;
import edu.sjsu.cmpe275.cartpool.dto.PoolRequest;
import edu.sjsu.cmpe275.cartpool.dto.User;
import edu.sjsu.cmpe275.cartpool.repository.OrderRepository;
import edu.sjsu.cmpe275.cartpool.repository.PoolRepository;
import edu.sjsu.cmpe275.cartpool.repository.PoolRequestRepository;
import edu.sjsu.cmpe275.cartpool.repository.UserRepository;

@Service
public class PoolService {

	@Autowired
	private PoolRepository poolRepository;

	@Autowired
	private PoolRequestRepository poolRequestRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private EmailService emailService;

	@Transactional
	public Pool createPool(Pool pool) {
		Optional<Pool> poolExists = poolRepository.findByNameOrPoolId(pool.getName(), pool.getPoolId());
		if (poolExists.isPresent()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT,
					"Pool already exists with same pool id or name. Try another.");
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
		if (newPooler.getPoolId() != null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot join more than one pool at a time");
		}

		User referrer = userRepository.findByScreenName(referrerScreenName);

		if (referrer == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid referrer. The referrer doesn't exist");
		}

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
	public String getApproverType(long userId) {
		Optional<Pool> pool = poolRepository.findByLeaderId(userId);
		if (pool.isPresent()) {
			return "Leader";
		}
		return "Referrer";
	}

	@Transactional
	public List<PoolRequest> getPoolRequests(String referrerScreenName) {
		return poolRequestRepository.findByReferrerScreenName(referrerScreenName);
	}

	@Transactional
	public List<PoolRequest> getPoolRequestsForLeader(String leaderScreenName) {
		return poolRequestRepository.findByLeaderScreenName(leaderScreenName);
	}

	//@Transactional
	public String approveReferralRequest(long requestId) {
		PoolRequest poolRequest = poolRequestRepository.findById(requestId).get();
		String poolName = poolRequest.getPoolName();
		Pool pool = poolRepository.findByName(poolName);
		Optional<User> leader = userRepository.findById(pool.getLeaderId());
		User newPooler = userRepository.findByScreenName(poolRequest.getUserScreenName());
		if (newPooler.getPoolId() != null) {
			poolRequest.setStatus("Cancelled");
			poolRequestRepository.save(poolRequest);
			throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,
					"The pooler already joined another pool. This referral is canceled");
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

	//@Transactional
	public String approveJoinRequestForLeader(long requestId) {
		PoolRequest poolRequest = poolRequestRepository.findById(requestId).get();
		User newPooler = userRepository.findByScreenName(poolRequest.getUserScreenName());
		if (newPooler.getPoolId() != null) {
			poolRequest.setStatus("Cancelled");
			poolRequestRepository.save(poolRequest);
			throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,
					"The pooler already joined another pool. This referral is canceled");
		}
		String poolName = poolRequest.getPoolName();
		Pool pool = poolRepository.findByName(poolName);
		newPooler.setPoolId(pool.getPoolId());
		poolRequest.setStatus("Approved");
		poolRequestRepository.save(poolRequest);
		userRepository.save(newPooler);
		return "Thank you. The user is now a member of the pool";
	}

	@Transactional
	public Pool deletePool(String poolId) {
		Pool pool = poolRepository.findByPoolId(poolId);
		if (pool == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pool not found");
		}

		List<User> poolers = userRepository.findAllByPoolId(poolId);
		int numberOfPoolers = poolers.size();

		if (numberOfPoolers == Constants.ONE) {
			long userId = poolers.get(0).getId();
			long leaderId = pool.getLeaderId();
			if (userId == leaderId) {
				poolRepository.deleteByPoolIdAndId(poolId, pool.getId());
				poolers.get(0).setPoolId(null);
				userRepository.save(poolers.get(0));
				return pool;
			}
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Inconsistent data");
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
					"Pool cannot be deleted because of the associated poolers");
		}
	}

	@Transactional
	public boolean leavePool(String poolId, long userId) {
		Pool pool = poolRepository.findByPoolId(poolId);
		if (pool == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pool not found");
		}

		Optional<User> userObj = userRepository.findById(userId);
		if (!userObj.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
		}
		User user = userObj.get();
		List<Order> orders = orderRepository.findAllByPooler(user);
		if (orders != null && !orders.isEmpty()) {
			for (Order order : orders) {
				if (!Constants.DELIVERED.equals(order.getStatus())
						&& !(Constants.PICKED_UP_BY_SELF.equals(order.getStatus()))) {
					throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
							"Cannot leave pool because of pending orders");
				}
			}
		}
		List<Order> deliveryTaskOrders = orderRepository.findAllByDeliveryPooler(user);
		if (deliveryTaskOrders != null && !deliveryTaskOrders.isEmpty()) {
			for (Order deliveryTask : deliveryTaskOrders) {
				if (!Constants.DELIVERED.equals(deliveryTask.getStatus())
						&& !(Constants.PICKED_UP_BY_SELF.equals(deliveryTask.getStatus()))) {
					throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
							"Cannot leave pool because of delivery tasks");
				}
			}
		}
		user.setPoolId(null);
		userRepository.save(user);
		return true;
	}
}
