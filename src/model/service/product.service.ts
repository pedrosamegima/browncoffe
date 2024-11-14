import { Injectable } from '@angular/core';
import { Iproduct } from './iproduct';
import { localProducts } from '../data/mock-products';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8080/produto';

  products:Iproduct[] = localProducts;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Iproduct[]>{
    return this.http.get<Iproduct[]>(this.apiUrl).pipe(
      catchError(error =>{
        console.error('Erro ao buscar produtos da API, usando produtos locais:', error);
        return of(this.products);
      })
      );
    }
  }
 
