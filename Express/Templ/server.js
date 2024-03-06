const app =  require('express')
const http = require('http');
const ir= app();

ir.

const server = http.createServer((req,res)=>{
	if(req.url =="/"){
	console.log("You are Home!!")
	}
	
	if(req.url =="/api"){
	console.log("Viewing apis")
	res.
	}
});

console.log("Starting connection...");
server.listen(3000,()=>console.log("Listening"))
