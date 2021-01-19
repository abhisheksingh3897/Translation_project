let chai=require("chai");
let chaiHTTP=require("chai-http");
var server = require('../server/app'); 
var redis = require('redis');

 //Asseration Style
chai.should();

chai.use(chaiHTTP);

describe('Tasks API', () =>{
	it("Test 1", (done)=>{
		let book = "data=I am abhi&inlang=en&lang=hi"
		chai.request(server)
			.post("/translateAPI")
			.send(book)
			.end((err,response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
			done();
			});
	})
})

describe('Tasks API', () =>{
	it("Test 2", (done)=>{
		let book = "data=I am abhi&inlang=en&lang=hi"
		chai.request(server)
			.post("/translateAPI")
			.send(book)
			.end((err,response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
			done();
			});
	})
})

describe('Tasks API', () =>{
	it("Test 3", (done)=>{
		let book = "data=prepare an assignment using nodejs&inlang=en&lang=fr"
		chai.request(server)
			.post("/translateAPI")
			.send(book)
			.end((err,response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
			done();
			});
	})
})
