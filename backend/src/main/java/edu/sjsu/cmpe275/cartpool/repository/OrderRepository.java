package edu.sjsu.cmpe275.cartpool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.cartpool.dto.Order;
import edu.sjsu.cmpe275.cartpool.dto.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
	public List<Order> findAllByPoolIdAndDeliveryPoolerAndStatusOrderByDateAsc(String poolId, User deliveryPooler,
			String status);

	public List<Order> findAllByPooler(User pooler);

	public List<Order> findAllByDeliveryPooler(User pooler);

	public List<Order> findAllByDeliveryPoolerAndStatus(User deliveryPoolerId, String status);

	public Order findByGroupId(int groupId);

	public List<Order> findAllByGroupId(int groupid);

	public List<Order> findByStoreName(String name);

}
