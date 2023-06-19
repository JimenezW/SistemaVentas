import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Category } from "src/app/responses/category/category.response";
import  icCategory  from "@iconify/icons-ic/twotone-category";

const tableColumns:TableColumn<Category>[]=[
    {
        label:'Nombre',
        property:'name',
        type:"text",
        cssClasses:['font-medium','w-10']
    },
    {
        label:'Descripcion',
        property:'description',
        type:"textTruncate",
        cssClasses:['font-medium','w-10']
    },
    {
        label:'F. Creación',
        property:'auditCreateDate',
        type:"datetime",
        cssClasses:['font-medium','w-10']
    },
    {
        label:'Estado',
        property:'stateCategory',
        type:"text",
        cssClasses:['font-medium','w-10']
    },
    {
        label:'',
        property:'menu',
        type:'buttonGroup',
        buttonItems:[
            {
                buttonLabel:'EDITAR',
                buttonAction:'edit',
                buttonCondition:null,
                disable:false
            },
            {
                buttonLabel:'ELIMINAR',
                buttonAction:'remove',
                buttonCondition:null,
                disable:false
            }
        ],
        cssClasses:['font-medium','w-10']
    }
]

const inputs={
    numFilter:0,
    textFilter:"",
    stateFilter:null,
    startDate:null,
    endDate:null
}

export const componentSettings={
    icCategory:icCategory,
    tableColumns:tableColumns,
    getInputs:inputs,
    initialSort:'Id',
    initialSortDir:'desc',
    buttnLabel:'EDITAR',
    buttnLabel2:'ELIMINAR',
    columnsFilter:tableColumns.map((colum)=> {return {label:colum.label, property:colum.property, type:colum.type}})
}
