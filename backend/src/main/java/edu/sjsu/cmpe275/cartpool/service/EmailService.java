package edu.sjsu.cmpe275.cartpool.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.cartpool.dto.PoolRequest;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender javaMailSender;

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
}