import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Category } from "src/app/responses/category/category.response";
import  icCategory  from "@iconify/icons-ic/twotone-category";
import { ListTableMenu } from "src/app/commons/list-table-menu.interface";
import icViewHeadline from '@iconify/icons-ic/twotone-view-headline';
import icLabel from "@iconify/icons-ic/twotone-label";
import { GenericValidators } from "@shared/validators/generic-validators";
import icCalendarMonth from '@iconify/icons-ic/twotone-calendar-today';
import { TableColumns } from "src/app/core/interfaces/list-table.interfaces";

const searchOptions=[
    {
        label:"Nombre",
        value:1,
        placeholder:'Buscar por nombre',
        validation:[GenericValidators.defaultName],
        validation_desc:'Sólo se permite letras en esta búsqueda.',
        mim_length:2
    },
    {
        label:"Descripción",
        value:1,
        placeholder:'Buscar por descripción',
        validation:[GenericValidators.defaultDescription],
        validation_desc:'Sólo se permite letras y números en esta búsqueda.',
        mim_length:2
    }
]

const  menuItems:ListTableMenu[]=[
    {
        type:'link',
        id:'all',
        icon:icViewHeadline,
        label:'Todos'
    },
    {
        type:'link',
        id:'Activo',
        value:1,
        icon:icLabel,
        label:'Activo',
        classes:{
            icon:'text-green'
        }
    },
    {
        type:'link',
        id:'Inactivo',
        value:0,
        icon:icLabel,
        label:'Inactivo',
        classes:{
            icon:'text-gray'
        }
    }
];

const tableColumns:TableColumns<Category>[]=[
    {
        label:'Nombre',
        property:'name',
        sortProperty:'name',
        type:"text",
        cssLabel:['font-bold','text-sm'],
        cssProperty:['font-semibold','text-sm', 'text-left'],
        sticky:true,
        sort:true,
        visible:true,
        download:true
    },
    {
        label:'Descripcion',
        property:'description',
        sortProperty:'description',
        type:"text",
        cssLabel:['font-bold','text-sm'],
        cssProperty:['font-semibold','text-sm', 'text-left'],
        sticky:false,
        sort:true,
        visible:true,
        download:true
    },
    {
        label:'F. Creación',
        property:'auditCreateDate',
        sortProperty:'auditCreateDate',
        type:"datetime",
        cssLabel:['font-bold','text-sm'],
        cssProperty:['font-semibold','text-sm', 'text-left'],
        sticky:false,
        sort:false,
        visible:true,
        download:true
    },
    {
        label:'Estado',
        property:'stateCategory',
        type:"badge",
        cssLabel:['font-bold','text-sm'],
        cssProperty:['font-semibold','text-sm', 'text-left'],
        sticky:false,
        sort:false,
        visible:true,
        download:true
    },
    {
        label:'',
        cssLabel:[],
        property:'icEdit',
        cssProperty:[],
        type:'icon',
        action:'edit',
        sticky:false,
        sort:false,
        visible:true,
        download:false
    },
    {
        label:'',
        cssLabel:[],
        property:'icDelete',
        cssProperty:[],
        type:'icon',
        action:'remove',
        sticky:false,
        sort:false,
        visible:true,
        download:false
    }/**/
]

const filters={
    numFilter:0,
    textFilter:"",
    stateFilter:null,
    startDate:null,
    endDate:null
}

const inputs={
    numFilter:0,
    textFilter:"",
    stateFilter:null,
    startDate:null,
    endDate:null
}

export const componentSettings={
    icCategory:icCategory,
    icCalendarMonth:icCalendarMonth,
    menuOpen:false,
    tableColumns:tableColumns,
    getInputs:inputs,
    initialSort:'Id',
    initialSortDir:'desc',
    buttnLabel:'EDITAR',
    buttnLabel2:'ELIMINAR',
    menuItems:menuItems,
    searchOptions:searchOptions,
    filters_dates_active:false,
    filters:filters,
    datesFilterArray:['Fecha de creación'],
    columnsFilter:tableColumns.map((colum)=> {return {label:colum.label, property:colum.property, type:colum.type}})
}
