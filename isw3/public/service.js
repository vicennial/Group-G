class AppService{

	constructor($http){
		this.http = $http;
	}
	
	httpCall(params,callback){
		if (params.url === undefined || params.url === '') {
			alert('Invalid Server call');
			return;
		};
		this.http({
			url:params.url,
			method: 'POST',
			data:params.data
		}).then( (response) =>{
			callback(response.data);
		}, (response) =>{		    
			callback(response.data);
		});
	}

	login(data,callback){
		if (data.username === undefined || data.username ===''){
			callback({
				error:true,
				message:'Invalid username.'
			});
		}else if(data.password === undefined || data.password ===''){
			callback({
				error:true,
				message:'Invalid password.'
			});
		}else{
			const params = {
				url : '/login',
				data : {
					username:data.username,
					password:data.password
				}
			};
			this.httpCall(params, (response)=>{
				callback(response);
			});
		}
	}

	usernameCheck(data,callback){
		if (data.username === undefined || data.username ===''){
			callback({
				error:true,
				message:'Invalid username.'
			});
		}else{
			const params = {
				url : '/usernameCheck',
				data : {
					username:data.username
				}
			};
			this.httpCall(params, (response)=>{
				callback(response);
			});
		}
	}

	register(data,callback){
		if (data.username === undefined || data.username ===''){
			callback({
				error:true,
				message:'Invalid username.'
			});
		}else if(data.password === undefined || data.password ===''){
			callback({
				error:true,
				message:'Invalid password.'
			});
		}else{
			const params = {
				url : '/registerUser',
				data : {
					username:data.username,
					password:data.password
				}
			};
			this.httpCall(params, (response)=>{
				callback(response);
			});
		}
	}

	getUserid(){
		const urlData = (window.location.pathname).split('/');		
		if (urlData.length < 3 ) {
			window.location.herf = '/';
		}else{
			return urlData[urlData.length-1];;
		}
	}

	userSessionCheck(callback){
		let userId = this.getUserid();
		const params = {
			url : '/userSessionCheck',
			data : {
				userId:userId
			}
		};
		this.httpCall(params, (response)=>{
			callback(response);
		});
	}

}