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

	@Autowired
	private EmailService emailService;

	@Autowired
	private StoreRepository storeRepository;

	public Order createDeferredOrder(DeferredOrderRequestModel deferredOrderRequestModel) {
		System.out.println(deferredOrderRequestModel.toString());

		Optional<User> poolerObj = userRepository.findById(deferredOrderRequestModel.getPoolerId());
		if (!poolerObj.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Pooler with this userId found");
		}

		if (poolRepository.findByPoolId(deferredOrderRequestModel.getPoolId()) == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Pool with this PoolId found");
		}

		if (deferredOrderRequestModel.getItems().size() == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No items in this order");
		}

		User pooler = poolerObj.get();
		pooler.setCreditScore(pooler.getCreditScore() - 1);
		userRepository.save(pooler);

		Optional<Store> store = storeRepository.findStoreById(deferredOrderRequestModel.getStoreId());
		Store pickupStore = store.get();

		Order order = new Order();
		order.setPooler(pooler);
		order.setPrice(deferredOrderRequestModel.getPrice());
		order.setPoolId(deferredOrderRequestModel.getPoolId());
		order.setStatus("Pending");
		order.setStoreName(pickupStore.getName());
		order.setDate(Calendar.getInstance().getTime());

		List<OrderDetail> orderDetails = new ArrayList<>();
		for (int i = 0; i < deferredOrderRequestModel.getItems().size(); i++) {
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setOrder(order);
			orderDetail
					.setProduct(productRepository.getOne(deferredOrderRequestModel.getItems().get(i).getProductId()));
			orderDetail.setPrice(deferredOrderRequestModel.getItems().get(i).getPrice());
			orderDetail.setQuantity(deferredOrderRequestModel.getItems().get(i).getQuantity());
			orderDetails.add(orderDetail);
		}
		order.setOrderDetails(orderDetails);
		orderRepository.save(order);
		emailService.sendEmailAfterOrderDeferredPickup(order, pooler.getEmail());
		return order;
	}

	@Transactional
	public List<Order> getFellowPoolerOrders(long userId) {
		Optional<User> userObj = userRepository.findById(userId);
		User user = userObj.get();
		String poolId = user.getPoolId();
		System.out.println("Pool Id-->" + poolId);

		List<Order> orders = orderRepository.findAllByPoolIdAndDeliveryPoolerAndStatusOrderByDateAsc(poolId, null,
				Constants.PENDING);

		return orders;
	}

	@Transactional
	public Order createSelfPickupOrder(SelfPickupOrderRequestModel selfPickupOrderRequestModel) {
		System.out.println(selfPickupOrderRequestModel.toString());

		Optional<User> userEntity = userRepository.findById(selfPickupOrderRequestModel.getPoolerId());
		if (!userEntity.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Pooler with this userId found");
		}

		if (poolRepository.findByPoolId(selfPickupOrderRequestModel.getPoolId()) == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Pool with this PoolId found");
		}

		if (selfPickupOrderRequestModel.getItems().size() == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No items in this order");
		}

		List<Long> listOfFellowOrderIds = selfPickupOrderRequestModel.getFellowPoolersOrders();

		userEntity.get().setCreditScore(userEntity.get().getCreditScore() + listOfFellowOrderIds.size());
		userRepository.save(userEntity.get());

		Optional<Store> store = storeRepository.findStoreById(selfPickupOrderRequestModel.getStoreId());
		Store pickupStore = store.get();
		Order order = new Order();
		order.setPooler(userEntity.get());
		order.setPrice(selfPickupOrderRequestModel.getPrice());
		order.setPoolId(selfPickupOrderRequestModel.getPoolId());
		order.setStatus(Constants.ASSIGNED);
		order.setDate(Calendar.getInstance().getTime());
		order.setDeliveryPooler(userEntity.get());
		order.setStoreName(pickupStore.getName());
		order.setDate(Calendar.getInstance().getTime());

		List<OrderDetail> orderDetails = new ArrayList<>();
		for (int i = 0; i < selfPickupOrderRequestModel.getItems().size(); i++) {
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setOrder(order);
			orderDetail
					.setProduct(productRepository.getOne(selfPickupOrderRequestModel.getItems().get(i).getProductId()));
			orderDetail.setPrice(selfPickupOrderRequestModel.getItems().get(i).getPrice());
			orderDetail.setQuantity(selfPickupOrderRequestModel.getItems().get(i).getQuantity());
			orderDetails.add(orderDetail);
		}
		order.setOrderDetails(orderDetails);
		orderRepository.save(order);

		List<Order> listOfFellowPoolerOrders = new ArrayList<Order>();
		if (listOfFellowOrderIds != null) {
			for (long orderId : listOfFellowOrderIds) {
				Order fellowOrder = orderRepository.getOne(orderId);
				fellowOrder.setDeliveryPooler(userEntity.get());
				fellowOrder.setStatus(Constants.ASSIGNED);
				orderRepository.save(fellowOrder);
				listOfFellowPoolerOrders.add(fellowOrder);
			}
		}
		emailService.sendEmailAfterOrderSelfPickup(order, userEntity.get().getEmail(), listOfFellowPoolerOrders);
		return order;
	}

	@Transactional
	public List<Order> getOrders(long userId) {
		Optional<User> userEntity = userRepository.findById(userId);

		if (!userEntity.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user with this userId found");
		}
		List<Order> orders = orderRepository.findAllByPooler(userEntity.get());
		return orders;
	}
	
	@Transactional
	public Order markOrderNotDelivered(long orderId) {
		Optional<Order> orderEntity = orderRepository.findById(orderId);

		if (!orderEntity.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
		}
		if(orderEntity.get().getStatus().equals(Constants.DELIVERED)) {
			orderEntity.get().setStatus(Constants.DELIVERY_NOT_RECEIVED);
			return orderRepository.save(orderEntity.get());
		} else {
			throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Order is not marked as delivered yet");
		}
	}
}
