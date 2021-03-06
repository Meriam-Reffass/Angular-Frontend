import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CatalogueService} from '../catalogue.service';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products:any;
  constructor(public catalogueService: CatalogueService,
    private router:Router,
    private route: ActivatedRoute) {} 

  ngOnInit(): void {
    this.router.events.subscribe(  value => {
      if(value instanceof NavigationEnd){
         let url = value.url;
        console.log(url);
        let p1=this.route.snapshot.params.p1;
         if(p1==1){
          this.getProducts( '/products/search/selectedProducts');
          } else if (p1==2){
          let idCat =this.route. snapshot.params.p2;
          this.getProducts(  '/categories/'+idCat+'/products');
         }
      }
     });
     let p1=this.route.snapshot.params.p1;
     if(p1==1){
      this.getProducts( '/products/search/selectedProducts');
     }
  }
  private getProducts(url:any){
    this.catalogueService.getResource(url)
    . subscribe( data =>{
      this.products = data;
     },  error =>{
      console.log(error);
     })
  }

}
