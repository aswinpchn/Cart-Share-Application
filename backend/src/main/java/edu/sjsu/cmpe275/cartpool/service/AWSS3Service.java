package edu.sjsu.cmpe275.cartpool.service;

import java.io.File;

import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Service
public class AWSS3Service {

	private AWSCredentials credentials = new BasicAWSCredentials("AKIAI7NGGBQXET2V45EA",
			"gK9crS+JMPkB7StY8btCHM71uoJg7vLi8XeE2xZs");

	private AmazonS3 s3client = AmazonS3ClientBuilder.standard()
			.withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(Regions.US_EAST_1).build();

	private String bucketName = "cartpool";

	public String uploadFile(String file, String productId) {
		s3client.putObject(bucketName, productId, new File(file));
		return s3client.getUrl(bucketName, productId).toString();
	}
}
