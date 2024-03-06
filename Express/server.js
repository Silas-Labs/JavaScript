const http = require('http');

const server = http.createServer((req,res)=>{
	if(req.url =="/"){
	console.log("You are Home!!")
	res.send("HONE")
	}
	
	if(req.url =="/api"){
	console.log("Viewing apis")
	}
});

console.log("Starting connection...");
server.listen(3000,()=>console.log("Listening"))
