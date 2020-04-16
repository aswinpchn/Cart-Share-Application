package edu.sjsu.cmpe275.cartpool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.sjsu.cmpe275.cartpool.service.UserService;

@Controller
@RequestMapping(path = "/cartpool")
public class ApplicationController {

	@Autowired
	private UserService userService;
}