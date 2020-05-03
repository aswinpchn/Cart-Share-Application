package edu.sjsu.cmpe275.cartpool.repository;

import edu.sjsu.cmpe275.cartpool.dto.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
