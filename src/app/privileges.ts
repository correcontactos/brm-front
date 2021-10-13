export class Privilege
{
	public id:number;
	public name:string;
	public access:string;
	
	constructor(id:number, name:string, access:string)
	{
		this.id = id;
		this.name = name;
		this.access = access;
	}
}