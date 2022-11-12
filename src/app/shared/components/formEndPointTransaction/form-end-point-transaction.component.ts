import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/model/interfaces';
import { Transactions } from '@core/model/interfacesTransactions';
import { TransactionsService } from '@core/services/banco/transactions.service';
import { BaseServicesService } from '@core/services/base-service';
import { UserDataService } from '@core/services/user-data.service';

@Component({
  selector: 'ab-form-end-point-transaction',
  templateUrl: './form-end-point-transaction.component.html',
  styleUrls: ['./form-end-point-transaction.component.scss']
})
export class FormEndPointTransactionComponent implements OnInit {

  Transferencias:Transactions[] = []
  enviarDinero!: FormGroup;
  correspondeIngreso:any;
  idMonto: any;
  fecha:string = ''
  hourAndDate:string=""
  UserID:number=0
  banco:any
  namesContactos:any


  constructor(
    public modalSS:TransactionsService,
    private formBuilder: FormBuilder,
    private base:BaseServicesService,
    private userData:UserDataService) { }

  dataUsuario:User = {
      id:0,
      first_name: "string",
      last_name: "string",
      email: "string",
      password: "string",
      roleId: 0,
      points: 0,
  }

  ngOnInit(): void {
    this.enviarDinero = this.formBuilder.group({
     amount:['', [Validators.required]],
     type:["number", [Validators.required]],
     concept:['', [Validators.required]]
    })
    
    this.base.getPerfil().subscribe((data)=>{
      this.dataUsuario = data
      console.log(data)
    })
    
    this.obtenerFecha()
    //this.getContactos()
  }


  sendTransaction(form:any){
    const {type, concept, amount} = this.enviarDinero.value

    const formData :Transactions = {
      amount: amount,
      concept: concept, 
      date: this.hourAndDate,    
      type: "payment",    
      accountId: type,
      userId: this.dataUsuario.id,
      to_account_id: 1
    }

    console.log(formData)
    console.log(form.valid)

    if(form.valid==false){
      console.log("formulario invalido")

    }else{
      console.log("formulario valido")
      this.modalSS.postTransaction(formData).subscribe(data => {
       console.log(data)
      })
      
    }
  }


// SERVICIO PARA OBTENER LISTA DE CONTACTOS
/*
  getContactos(){
    this.base.getUsers().subscribe((res:any)=>{
      const{data}=res
      this.namesContactos=data
      console.log(this.namesContactos)
    })
  }
*/


  obtenerFecha (){
    //FECHA//
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10 && day < 10){
      this.fecha = `${year}-0${month}-0${day}`
      console.log(this.fecha)
    }else{
      this.fecha = `${year}-${month}-${day}`
      console.log(this.fecha)
    }
    //HORA//
    let timeHour = date.getHours()
    let timeMinutes = date.getMinutes().toString()
    let timeSecond = date.getSeconds().toString()
    let clockSet

    if(timeHour.toString().length<2){
      let timeHourString = timeHour.toString()
      timeHourString = "0" + timeHourString
      clockSet = `${timeHourString}:${timeMinutes}:${timeSecond}`
    }else{
      clockSet = `${timeHour}:${timeMinutes}:${timeSecond}`
    }
    console.log(clockSet)

    this.hourAndDate = this.fecha +" "+ clockSet
    console.log(this.hourAndDate)
  }
}
