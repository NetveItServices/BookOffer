import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpApiService } from './service/http-api.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'donatebook';
   bookForm: FormGroup;
   donatebookdetails:any  = {
    name : null,
    phone : null,
    email : null,
    books : []
   };
   bookdetails = {
    userid:null,
    srno :null,
    booktitle : null,
    author: null,
    genre : null,
    yearofpublication: null,
    isbn: null
   }

  selectedIndex: any;
  isEditmode: boolean =false;

  
    constructor(private fb: FormBuilder, public httprequest : HttpApiService) {
      this.bookForm = this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }
  
    addNewRow() {
      console.log('form ==',this.bookForm);
      // console.log('book details===',this.bookdetails);
      this.donatebookdetails["name"] = this.bookForm.value.name,
      this.donatebookdetails["phone"] = this.bookForm.value.phone,
      this.donatebookdetails["email"] = this.bookForm.value.email

       let req = {
        name : this.bookForm.value.name,
        phone : this.bookForm.value.phone,
        email : this.bookForm.value.email
       }
       console.log(req)
       this.httprequest.postRequestToBackend('/create',req).subscribe((res) =>{
        console.log("response ===>",res)
        localStorage.setItem('userData',res.data)
       })
    }    
 
       addNewbookRecord(){
        let books ={
          "userid":this.bookdetails.userid,
          "Sno": this.bookdetails.srno,
          "Booktitle": this.bookdetails.booktitle,
          "Author": this.bookdetails.author,
          "Genre": this.bookdetails.genre,
          "Yearofpublication": this.bookdetails.yearofpublication,
          "ISBN": this.bookdetails.isbn
        }

        this.httprequest.postRequestToBackend('/api/books/create',books).subscribe((res) =>{
          console.log("response ===>",res)
          //localStorage.setItem('userData',res.data)
        })
  
        this.donatebookdetails['books'].push(books);

        this.bookdetails = {
          userid:null,
          srno :null,
          booktitle : null,
          author: null,
          genre : null,
          yearofpublication: null,
          isbn: null
         }
        }

        deleteItem(index: number): void {
          const isConfirmed = confirm('Do you really want to delete this record?');
          if (isConfirmed) {
            this.donatebookdetails.books.splice(index,1);
          }
        }
        // deleteItem(index: number): void {
        //   console.log("my array index ===",index)
        //   this.donatebookdetails.books.splice(index,1);
        // }
        
        editItem(editdata:any,index : any){
          this.selectedIndex = index;
          this.isEditmode  = true;
          console.log("my edit data ===",editdata)
          
          this.bookdetails['userid']=editdata.userid;
          this.bookdetails['srno'] = editdata.sno;
          this.bookdetails['booktitle'] = editdata.booktitle;
          this.bookdetails['author'] = editdata.author;
          this.bookdetails['genre'] = editdata.genre;
          this.bookdetails['yearofpublication'] = editdata.yearofpublication;
          this.bookdetails['isbn'] = editdata.isbn;
        }
      
     updateData(){
      this.donatebookdetails.books[this.selectedIndex].userid = this.bookdetails['userid'];
      this.donatebookdetails.books[this.selectedIndex].sno = this.bookdetails['srno'];
      this.donatebookdetails.books[this.selectedIndex].booktitle = this.bookdetails['booktitle'];
      this.donatebookdetails.books[this.selectedIndex].author = this.bookdetails['author'];
      this.donatebookdetails.books[this.selectedIndex].genre = this.bookdetails['genre'];
      this.donatebookdetails.books[this.selectedIndex].yop = this.bookdetails['yearofpublication'];
      this.donatebookdetails.books[this.selectedIndex].isbn = this.bookdetails['isbn'];
     
      this.bookdetails = {
        userid:null,
        srno :null,
        booktitle : null,
        author: null,
        genre : null,
        yearofpublication: null,
        isbn: null
       }
      
      //this.bookForm.reset();
      this.isEditmode=false;
     
     }
  }


