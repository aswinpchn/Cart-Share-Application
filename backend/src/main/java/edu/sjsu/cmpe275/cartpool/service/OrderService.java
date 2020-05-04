package edu.sjsu.cmpe275.cartpool.service;

import edu.sjsu.cmpe275.cartpool.dto.*;
import edu.sjsu.cmpe275.cartpool.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class OrderService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PoolRepository poolRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private OrderRepository orderRepository;

	public Order createDeferredOrder(DeferredOrderRequestModel deferredOrderRequestModel) {
		System.out.println(deferredOrderRequestModel.toString());

		if (!userRepository.findById(deferredOrderRequestModel.getPoolerId()).isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Pooler with this userId found");
		}

		if (poolRepository.findByPoolId(deferredOrderRequestModel.getPoolId()) == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Pool with this PoolId found");
		}

		if (deferredOrderRequestModel.getItems().size() == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No items in this order");
		}

		User pooler = userRepository.findById(deferredOrderRequestModel.getPoolerId()).get();
		pooler.setCreditScore(pooler.getCreditScore() - 1);
		userRepository.save(pooler);

		Order order = new Order();
		order.setPooler(userRepository.findById(deferredOrderRequestModel.getPoolerId()).get());
		order.setPrice(deferredOrderRequestModel.getPrice());
		order.setPoolId(deferredOrderRequestModel.getPoolId());
		order.setStatus("Pending");
		order.setDate(Calendar.getInstance().getTime());

		List<OrderDetail> orderDetails = new ArrayList<>();
		for (int i = 0; i < deferredOrderRequestModel.getItems().size(); i++) {
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setOrder(order);
			orderDetail.setProduct(productRepository.getOne(deferredOrderRequestModel.getItems().get(i).getProductId()));
			orderDetail.setPrice(deferredOrderRequestModel.getItems().get(i).getPrice());
			orderDetail.setQuantity(deferredOrderRequestModel.getItems().get(i).getQuantity());
			orderDetails.add(orderDetail);
		}
		order.setOrderDetails(orderDetails);
		orderRepository.save(order);
		return order;
	}
}
