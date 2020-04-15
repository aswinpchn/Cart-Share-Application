package edu.sjsu.cmpe275.cartpool.controller;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

@ControllerAdvice
public class ApplicationControllerInterceptor {
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		StringTrimmerEditor stringtrimmer = new StringTrimmerEditor(false);
		binder.registerCustomEditor(String.class, stringtrimmer);
	}
}
