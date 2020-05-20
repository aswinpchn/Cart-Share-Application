275-Term-Project

Members:
1. Aswin Prasad - 014344512 (aswin.prasad@sjsu.edu)
2. Shubhangi Yadav - 014517412 (shubhangi.yadav@sjsu.edu)
3. Sruthi Duvvuri - 014528813 (sruthi.duvvuri@sjsu.edu)
4. Vidita Vijaykumar Daga - 014488630 (viditavijaykumar.daga@sjsu.edu)

APP URL:
http://ec2-52-23-158-241.compute-1.amazonaws.com:3000/

To run Frontend:
1. In base folder, 
2. `cd frontend`
3. `npm install`
4. `npm start`

There are two ways to run backend
a) In IDE's:
1. Import project.
2. Build app.
3. Run app.

b) In CLI:
1. Pre requsites, Java 8 and maven installed.
2. `mvn clean install`
3. `mvn spring-boot:run`

Assumptions:
1. Reviewing and approving requests to join pool: 
After receiving mail to approve requests to join pool, the user needs to login to the application, navigate to Pool Tab →  Review Pool Requests page, check his Requests in referrer tab. If the user is a leader, we are providing him access to both Requests for referrer and Requests for leader tabs. A leader can review requests aimed for the pool leader in Requests for Leader tab.

2. Joining a Pool : 
While joining a pool, if the user gives the Referrer Screen Name as the name of a Pool leader, then we are assuming that the Pool leader will act as both referrer and leader for that  request and as soon as he approves the request , the member should be added to the pool. So, this request can be viewed by the leader in Requests for Referrer tab itself and once approved the user is added to the pool.

3. Pickup Orders page: 
The option to pickup will be enabled only after the Scan QR code action is done.

4. User Registration: 
While registering, the user is expected to fill address details along with Screen Name and Nickname, as these details can be used while he places an order. If he wants to update his address, it can be done in Account → My Account page.
 
