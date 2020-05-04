package edu.sjsu.cmpe275.cartpool.repository;

import edu.sjsu.cmpe275.cartpool.dto.Order;
import edu.sjsu.cmpe275.cartpool.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    public List<Order> findAllByPoolIdAndDeliveryPoolerAndStatusOrderByDateAsc(String poolId, User deliveryPooler , String status);
    public List<Order> findAllByPooler(User pooler);
}
