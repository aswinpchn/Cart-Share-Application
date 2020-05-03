package edu.sjsu.cmpe275.cartpool.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import edu.sjsu.cmpe275.cartpool.dto.Order;
import edu.sjsu.cmpe275.cartpool.dto.PoolRequest;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private TemplateEngine templateEngine;

	public void sendEmail(String email, int code) {
		try {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message);
			helper.setTo(email);
			helper.setSubject("Welcome to SJSU CartPool");
			String msgBody = "Please verify your account\n"
					+ "<a href=http://localhost:8081/cartpool/user/verify?email=" + email + "&code=" + code
					+ ">Verify</a>";
			helper.setText(msgBody, true);
			javaMailSender.send(message);
		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public void sendEmailToPoolReferrer(String toEmailAddress, PoolRequest poolRequest) {
		try {
			String userScreenName = poolRequest.getUserScreenName();
			String poolName = poolRequest.getPoolName();
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message);
			helper.setTo(toEmailAddress);
			helper.setSubject("CartPool join request - Referral");
			String msgBody = "Thank you for referring \n" + userScreenName + " for the pool: " 
					+ poolName + "."
					+ "\n Please login to the cartpool and approve the request>";
			helper.setText(msgBody, true);
			javaMailSender.send(message);
		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public void sendEmailToPoolLeader(String toEmailAddress, PoolRequest poolRequest) {
		try {
			String userScreenName = poolRequest.getUserScreenName();
			String poolName = poolRequest.getPoolName();
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message);
			helper.setTo(toEmailAddress);
			helper.setSubject("CartPool join request - Referral");
			String msgBody = "Hi ! You have received a pool join request from \n" + userScreenName + " for the pool: " 
					+ poolName + "."
					+ "\n Please login to the cartpool and approve the request>";
			helper.setText(msgBody, true);
			javaMailSender.send(message);
		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public boolean sendEmailAfterOrderDeferredPickup(Order order, String toAddress) {
		Context context = new Context();
		context.setVariable("orderId", order.getId());
		context.setVariable("orderDate", order.getDate());
		context.setVariable("orderPrice", order.getPrice());
		context.setVariable("orderDetails", order.getOrderDetails());
		String content = templateEngine.process("orderplacedefer", context);
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		try {
			helper.setTo(toAddress);
			helper.setSubject("CartPool Order Confirmation");
			helper.setText(content, true);
			javaMailSender.send(message);
			return true;
		} catch (Exception ex) {
			// log here
		}
		return false;
	}
}