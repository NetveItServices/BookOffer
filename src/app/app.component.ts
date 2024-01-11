import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    srno :null,
    booktitle : null,
    author: null,
    genre : null,
    yearofpublication: null,
    isbn: null
   }
  
    constructor(private fb: FormBuilder) {
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
      }

      // delRow() {
      //   this.bookdetails["srno"]=this.bookForm.value.srno,
      //   this.bookdetails["booktitle"]=this.bookForm.value.bookdetails;
      //   this.bookdetails["author"]=this.bookForm.value.author;
      //   this.bookdetails["genre"]=this.bookForm.value.genre;
      //   this.bookdetails["yearofpublication"]=this.bookForm.value.yearofpublication;
      //   this.bookdetails["isbn"]=this.bookForm.value.isbn;
      // }
 


      addNewbookRecord(){
        let books ={
          "sno": this.bookdetails.srno,
          "booktitle": this.bookdetails.booktitle,
          "author": this.bookdetails.author,
          "genre": this.bookdetails.genre,
          "yop": this.bookdetails.yearofpublication,
          "isbn": this.bookdetails.isbn
        }
  
        this.donatebookdetails['books'].push(books);

        this.bookdetails = {
          srno :null,
          booktitle : null,
          author: null,
          genre : null,
          yearofpublication: null,
          isbn: null
         }
        }
        deleteItem(index: number): void {
          console.log("my array index ===",index)
          this.donatebookdetails.books.splice(index,1);
        }

  }


