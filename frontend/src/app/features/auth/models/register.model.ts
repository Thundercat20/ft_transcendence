export interface RegisterRequest {
	username: 	string;
	email: 		string;
	password: 	string;
}

export interface RegisterResponse {
	id: 		string;
	username: 	string;
	email: 		string;
	createdAt: 	string;
}
