package edu.sjsu.cmpe275.cartpool.service;

import edu.sjsu.cmpe275.cartpool.Constants;
import edu.sjsu.cmpe275.cartpool.dto.*;
import edu.sjsu.cmpe275.cartpool.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

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

	@Transactional
	public List<Order> getFellowPoolerOrders(long userId) {
		Optional<User> userObj = userRepository.findById(userId);
		User user = userObj.get();
		String poolId = user.getPoolId();
		System.out.println("Pool Id-->" + poolId);

		List<Order> orders = orderRepository.findAllByPoolIdAndDeliveryPoolerAndStatusOrderByDateAsc(poolId, null, Constants.PENDING);

		return orders;
	}

	@Transactional
	public Order createSelfPickupOrder(SelfPickupOrderRequestModel selfPickupOrderRequestModel) {
		System.out.println(selfPickupOrderRequestModel.toString());

		if (!userRepository.findById(selfPickupOrderRequestModel.getPoolerId()).isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Pooler with this userId found");
		}

		if (poolRepository.findByPoolId(selfPickupOrderRequestModel.getPoolId()) == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Pool with this PoolId found");
		}

		if (selfPickupOrderRequestModel.getItems().size() == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No items in this order");
		}

		User deliveryUser = userRepository.getOne(selfPickupOrderRequestModel.getPoolerId());

		Order order = new Order();
		order.setPooler(userRepository.findById(selfPickupOrderRequestModel.getPoolerId()).get());
		order.setPrice(selfPickupOrderRequestModel.getPrice());
		order.setPoolId(selfPickupOrderRequestModel.getPoolId());
		order.setStatus(Constants.ASSIGNED);
		order.setDate(Calendar.getInstance().getTime());
		order.setDeliveryPooler(deliveryUser);

		List<OrderDetail> orderDetails = new ArrayList<>();
		for (int i = 0; i < selfPickupOrderRequestModel.getItems().size(); i++) {
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setOrder(order);
			orderDetail.setProduct(productRepository.getOne(selfPickupOrderRequestModel.getItems().get(i).getProductId()));
			orderDetail.setPrice(selfPickupOrderRequestModel.getItems().get(i).getPrice());
			orderDetail.setQuantity(selfPickupOrderRequestModel.getItems().get(i).getQuantity());
			orderDetails.add(orderDetail);
		}
		order.setOrderDetails(orderDetails);
		orderRepository.save(order);

		List<Long> listOfFellowOrderIds = selfPickupOrderRequestModel.getFellowPoolersOrders();
		for(long orderId : listOfFellowOrderIds) {
			Order fellowOrder = orderRepository.getOne(orderId);
			fellowOrder.setDeliveryPooler(deliveryUser);
			fellowOrder.setStatus(Constants.ASSIGNED);
			orderRepository.save(fellowOrder);
		}

		return order;
	}
}
