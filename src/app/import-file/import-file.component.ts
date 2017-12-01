import { Component, OnInit, ViewChild } from '@angular/core';
import { FileutilService } from '../fileutil.service';
import { Constants } from '../file.constants';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})
export class ImportFileComponent implements OnInit {

    @ViewChild('fileImportInput')
    fileImportInput: any;
    csvRecords = [];

    constructor(private _fileUtil: FileutilService) { }

    ngOnInit() {
    }

    fileChangeListener($event): void {
        var text = [];
        var target = $event.target || $event.srcElement;
        var files = target.files;

        if(Constants.validateHeaderAndRecordLengthFlag){
            if(!this._fileUtil.isCSVFile(files[0])){
                alert("Please import valid .csv file.");
                this.fileReset();
            }
        }

        var input = $event.target;

        //console.log(input);

        var reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = (data) => {
            let csvData = reader.result;

            // console.log(csvData);
            // name,ip,username,password
            // rahul,127.0.0.1,hello1,world1
            // john,127.0.0.2,hello2,world2

            let csvRecordsArray = csvData.split(/\r\n|\n/);

            //console.log(csvRecordsArray);
            // 0 : "name,ip,username,password"
            // 1 : "rahul,127.0.0.1,hello1,world1"
            // 2 : "john,127.0.0.2,hello2,world2"

            var headerLength = -1;
            if(Constants.isHeaderPresentFlag){
                let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
                headerLength = headersRow.length;
            }

            this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(
                                                csvRecordsArray,
                                                headerLength,
                                                Constants.validateHeaderAndRecordLengthFlag,
                                                Constants.tokenDelimeter
                                            );

            if(this.csvRecords == null){
                //If control reached here it means csv file contains error, reset file.
                this.fileReset();
            }
        }

        reader.onerror = function () {
            alert('Unable to read ' + input.files[0]);
        };
    };

    fileReset(){
        this.fileImportInput.nativeElement.value = "";
        this.csvRecords = [];
    }

}
