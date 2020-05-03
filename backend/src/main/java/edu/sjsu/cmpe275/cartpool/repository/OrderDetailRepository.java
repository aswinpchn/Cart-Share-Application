package edu.sjsu.cmpe275.cartpool.repository;

import edu.sjsu.cmpe275.cartpool.dto.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
