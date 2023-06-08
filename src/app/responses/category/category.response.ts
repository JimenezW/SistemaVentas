export interface Category{
    CategoryId :number,
    Name:string,
    Description :string,
    AuditCreateDate :Date,
    State :number,
    StateCategory:string
}

export interface CategoryApi{
    data:any,
    totalRecords:number
}