export class User
{
	public id:number;
	public user:string;
	public privilege:string;
	public access:string;
	
	constructor(id:number, user:string, privilege:string, access:string)
	{
		this.id = id;
		this.user = user;
		this.privilege = privilege;
		this.access = access;
	}
}