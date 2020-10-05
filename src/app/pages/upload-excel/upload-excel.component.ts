import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent implements OnInit {

  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  dataSheet1 : any;
  dataSheet2 : any;
  arraySheet = []

  ngOnInit(): void {
  }

  constructor(private api:ApiService) { }

  onFileChange(ev:any) {
    let workBook = null;
    let jsonData = null;

    this.arraySheet = []
   
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];

        // console.log("sheet =>",sheet);
        
        initial[name] = XLSX.utils.sheet_to_json(sheet);

        // console.log("initial[name] =>",initial[name]);

        this.arraySheet.push(initial[name])
        
        return initial;
      }, {});



      // console.log("jsonData Sheet1 =>",jsonData.Sheet1);
      // console.log("jsonData Sheet2 =>",jsonData.Sheet2);
      // console.log("jsonData =>",jsonData);
      console.log("arraySheet =>",this.arraySheet);

      this.dataSheet1 = jsonData.Sheet1
      this.dataSheet2 = jsonData.Sheet2
 
      
      const dataString = JSON.stringify(jsonData);
      

      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      // this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  // setDownload(data:any) {
  //   this.willDownload = true;
  //   setTimeout(() => {
  //     const el = document.querySelector("#download");
  //     el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
  //     el.setAttribute("download", 'xlsxtojson.json');
  //   }, 1000)
  // }

  submit(){

    // console.log("data1 =>", {members: this.dataSheet1});
    // console.log("data2 =>", this.dataSheet2);

 
    let dataSend = []


    for (const element of this.arraySheet) {
      // console.log(element);

      for (const e of element) {
        // console.log(e);

        dataSend.push(e);
        
   
      }
    }

    // console.log("dataSend =>",dataSend);
    


    const jsonData = {
      segmentCode : dataSend[0].segment_code,
      segmentName :dataSend[0].segment_code,
      members: dataSend
    }

    console.log("jsonData =>",jsonData);
    

    console.log("CALL insertMembers");
    

    this.api.insertMembers(jsonData)
    .then((result) => {

      console.log("result =>",result);
      alert("Success")
      
      
    }).catch((err) => {

      console.log("err =>",err);
      alert(err.error.message)
      
      
    });
    


  }



}
