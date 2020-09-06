import { LightningElement, api, track,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class YearPicker extends LightningElement {

    @track
    openYear=false;

    @wire(CurrentPageReference) pageRef;

    @api
    selectedYear=new Date().getFullYear();

    @api
    page=1;

    @api
    totalYearSize;

    @api
    totalYear;

    @api
    listYearPerPage;

    @api
    yearPerPage=9;

    @api
    endingRecord=0;

    @api
    startingRecord =1;

    @api
    totalPage;

    //get yearList(){
    connectedCallback(){
        let year=new Array();
        for(let i=0 ;i<197;i++){
            let y=1950+i;
            year.push(y);
        }
        //console.log(year);

        this.totalYearSize=year.length;
        this.totalPage=Math.ceil(this.totalYearSize/this.yearPerPage);

        this.totalYear=year;
        this.listYearPerPage=this.totalYear.slice(0,this.yearPerPage);
       //this.displayYearPerPage(8);
        this.endingRecord=this.yearPerPage;

        
        setTimeout(()=>{
            for(let i=0 ; i< this.pageNumber(new Date().getFullYear()) ; i++){
                this.nextHandler();
                //console.log(i);
            }
        },700);

        //return this.listYearPerPage;
    }

    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayYearPerPage(this.page);
        }
    }

    nextHandler() {

       // console.log('page',this.page);
        //console.log('total year',this.totalPage);
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; //increase page by 1
            this.displayYearPerPage(this.page);            
        }   
      /*  if(this.page === this.totalPage){
            console.log('final');
        } */         
    }

    displayYearPerPage(page){

        this.startingRecord=((page-1)*this.yearPerPage);
        this.endingRecord=(this.yearPerPage  * page);

        this.listYearPerPage=this.totalYear.slice(this.startingRecord,this.endingRecord);
    }

    openYearPicker(){       
        this.openYear=true;
    }

    selectYear(event){
        //console.log(event.target);
        this.selectedYear=event.target.innerText;

        /** passing the year to documentHeader */
        /*fireEvent(this.pageRef,"selectYearEvent",{
            'selectedYear':this.selectedYear
        })*/
        this.dispatchEvent(new CustomEvent("selectyear",{
            detail:this.selectedYear
        }));
        this.closeYearPicker();
    }

    closeYearPicker(){
        if(this.openYear){
            this.openYear=false;
        }
    }

    pageNumber(searchingElement){

        //let searchingElement=2020;
        let currentYearPageNumber;
        let pageNumber=0;
        let temp=0;
        for(let d of this.totalYear){
            temp++;
            if(temp === (this.yearPerPage -1)){
                pageNumber++;
                temp=0;               
            }
            if(d === searchingElement){
                currentYearPageNumber=pageNumber-1;
                break;
            }
        }

        return currentYearPageNumber;
    }

}
