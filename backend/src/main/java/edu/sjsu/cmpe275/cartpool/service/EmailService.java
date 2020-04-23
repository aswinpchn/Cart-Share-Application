package edu.sjsu.cmpe275.cartpool.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
			String msgBody = "Please verify your account\n" + "<a href=http://localhost:8081/cartpool/user/verify?email="
					+ email + "&code=" + code + ">Verify</a>";
			helper.setText(msgBody, true);
			javaMailSender.send(message);
		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}