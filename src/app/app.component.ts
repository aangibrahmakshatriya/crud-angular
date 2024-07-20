import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    const localData = localStorage.getItem("crud");
    if(localData != null){
      this.studentList = JSON.parse(localData)
    }
   }
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj:Student =new Student();
  studentList:Student[]=[];
  openModel(){
    const model=document.getElementById("myModal");
    if(model !=null){
      model.style.display='block'
    }
  }
  closeModel(){
    this.studentObj=new Student();
     if(this.model !=null){
    this.model.nativeElement.style.display = 'none';
    }
  }
  onEdit(item:Student){
    this.studentObj=item;
    this.openModel();
  }
  onDelete(item:Student){
    const isDelete = confirm("Are you want to delete");
    if(isDelete){
      const currentRecord =this.studentList.findIndex(m=> m.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem("crud",JSON.stringify(this.studentList));
    }
  }
  updateStudent(){
    const currentRecord =this.studentList.find(m=> m.id === this.studentObj.id)
    if(currentRecord != undefined){
      currentRecord.name=this.studentObj.name;
      currentRecord.address=this.studentObj.address;
      currentRecord.mobileNo=this.studentObj.mobileNo;
      localStorage.setItem("crud",JSON.stringify(this.studentList));
      this.closeModel()
    }
  }
  saveStudent(){
    debugger;
    const isLocalPresent = localStorage.getItem("crud");
    if(isLocalPresent != null){
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id=oldArray+1;
      oldArray.push(this.studentObj);
      this.studentList=oldArray;
      localStorage.setItem("crud",JSON.stringify(oldArray));
    }else{
      const newArr =[];
      newArr.push(this.studentObj);
      this.studentObj.id=1;
      this.studentList=newArr;
      localStorage.setItem("crud",JSON.stringify(newArr));
        }
      this.closeModel()
  }
}

export class Student {
  id:number;
  name: string;
  mobileNo:string;
  email:string;
  city:string;
  state:string;
  pincode:string;
  address:string;

  constructor(){
    this.id=0;
    this.name='';
    this.mobileNo='';
    this.email='';
    this.city='';
    this.state='';
    this.pincode='';
    this.address='';
  }
}


