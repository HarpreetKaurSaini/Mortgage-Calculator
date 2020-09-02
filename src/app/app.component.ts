import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mortgageAmount:number;
  public interestRate:number;
  public amorPeriodYears=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  public amorPeriodYear:number;
  public amorPeriodMonths=[1,2,3,4,5,6,7,8,9,10,11];
  public amorPeriodMonth:number;
  public paymentFrequencyArray=["Accelerated Weekly","Weekly","Accelerated Bi-weekly","Bi-Weekly (every 2 weeks)","Semi-monthly (24x per year)","Monthly (12x per year)"];
  public paymentFrequency:string;
  public terms=[1,2,3,4,5,6,7,8,9,10];
  public term:number;
  public preAmount:number;
  public preFrequency=["One Time","Each Year","Same as Regular Payment"];
  public preStart:number;
  
  public termNumPayment:number;
  public mortgagePayment:number;
  public monthlyInterest:number;
  public termCost:number;
  public termSaving:number;
  
  title = 'mortgage-calculator';
  
  isValid=false;
  constructor(){
  this.mortgageAmount=100000.00;
  this.interestRate=5.0;
  this.amorPeriodYear=10;
  this.amorPeriodMonth=0;
  this.paymentFrequency="Bi-Weekly (every 2 weeks)";
  this.term=10;
  this.preAmount=0.0;
  this.preStart=1;
  this.calculateMortgage();

  }
 
  public calculateMortgage()
  { 
    this.termNumPayment=  this.calculateTermPayments();
  //Find the interest rate for every installment i.e. every month in a year(12)*term i.e.how many years
    
  let ir=this.interestRate/(12*this.term);

  //m=p*r*((power n of (1+r))/(power n of(1+r)-1))
    this.mortgagePayment=this.mortgageAmount *ir*((Math.pow((1+ir),this.termNumPayment))/(Math.pow((1+ir),this.termNumPayment)-1));

    this.monthlyInterest = this.calculateTermInterest();
    this.termCost=this.calculateTermCost();
    this.termSaving=this.calculateTermSaving();
  }

  public calculateTermPayments(){
    let tp=0;
    if(this.paymentFrequency=="Accelerated Weekly"||this.paymentFrequency=="Weekly"){
      tp=this.term*52;
    }
    else{
          if(this.paymentFrequency=="Accelerated Bi-weekly"||this.paymentFrequency=="Bi-Weekly (every 2 weeks)"){
            tp=this.term*(52/2);
          }
          else{
              if(this.paymentFrequency=="Semi-monthly (24x per year)"){
                tp=this.term*24;
              }
              else{
                tp=this.term*12;
              }
          }
        }
      return tp;
    }
    public calculateTermInterest(){
      //interest=(Amount of Mortgagae - Number of Term Payments) divided by calculated mortgage Payment
      return ((this.mortgageAmount-this.termNumPayment)/this.mortgagePayment);
    }
    
    public calculateTermCost(){
      //Add interest in Payment
      return (this.mortgagePayment+this.monthlyInterest);
    }
    public calculateTermSaving(){
      //taking a constant value here just to create some formulea
      return(this.monthlyInterest-(this.monthlyInterest*.02));
    }
  }


