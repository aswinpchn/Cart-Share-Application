package edu.sjsu.cmpe275.cartpool.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void configureContentNegotiation(final ContentNegotiationConfigurer configurer) {
		configurer.favorPathExtension(false).
				favorParameter(true).
				parameterName("format").
				ignoreAcceptHeader(true).
				useJaf(false).
				defaultContentType(MediaType.APPLICATION_JSON).
				mediaType("xml", MediaType.APPLICATION_XML).
				mediaType("XML", MediaType.APPLICATION_XML).
				mediaType("json", MediaType.APPLICATION_JSON);
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/cartpool/**")
		.allowedOrigins("http://localhost:3000")
		.allowedMethods("PUT", "DELETE", "GET", "POST")
		 .allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Request-Method",
                 "Access-Control-Request-Headers")
         .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
		.allowCredentials(true).maxAge(3600);
	}
}
