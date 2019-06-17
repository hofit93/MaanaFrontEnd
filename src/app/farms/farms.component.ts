import { Component, OnInit } from '@angular/core';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css']
})
export class FarmsComponent implements OnInit {

  files: TreeNode[] = [];
  loading: boolean = true;
  token: string;
  private sub: any;

  constructor(private http: Http,private route: ActivatedRoute) { }

  ngOnInit() {
    //get the token
    this.sub = this.route.queryParams
    .subscribe(params => {
      this.token = params['user_api_token']; 
   });
    
   //call getFarm using rest API
    const headers = new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json','X-User-Api-Token': this.token});
    const options = new RequestOptions({headers: headers,withCredentials:true});
    this.http.get('https://qa.manna-irrigation.com:8443/omer/api/v2/farms', 
                  options)
    .toPromise()
    .then(farms => {
     var farmsArr = farms.json();
     farmsArr.forEach(element => {
      //for each farm call getFields using rest API
      const headers = new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json','X-User-Api-Token': this.token});
      const options = new RequestOptions({headers: headers,withCredentials:true});
      this.http.get('https://qa.manna-irrigation.com:8443/omer/api/v2/fields?farm_id='+element.id, 
                    options).toPromise()
                    .then(fields => {
                      var fieldsArr = fields.json();
                      var children = [];
                      fieldsArr.forEach(field => {
                        children.push(
                        {
                          label:field.name,
                          data: "field",
                          icon:"fa fa-leaf"
                        });
                      });//enf for

                      this.files.push(
                        {
                          label:element.name,
                          data: "farm",
                          children:children,
                          icon:"fa fa-tree"
                        }
                      )
                    }).catch(Error => {
                      console.log(Error);
                    });
     });
     this.loading = false;
    }).catch(Error => {
      console.log(Error);
    });
  }
}


