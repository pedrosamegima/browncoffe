import { Component } from '@angular/core';
import { ProductsService } from '../../model/service/product.service';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../model/service/iproduct';
import { HttpClientModule } from '@angular/common/http';
import { localProducts } from '../../model/data/mock-products';
import { StarRatingDirective } from '../diretivas/star-rating.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, StarRatingDirective],
  providers: [ProductsService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];

  selectedButton: string = 'featured';

  constructor(private productService: ProductsService) {
    this.loadProducts(this.selectedButton);
  }
  loadProducts(selectedButton: string): void {
    this.productService.getProducts().subscribe(
      (data: Iproduct[]) => {
        this.products = data;
        if (selectedButton === 'featured') {
          this.filteredProducts = this.products;
        } else {
          this.filteredProducts =
         this.products.filter(product => product.filter === selectedButton)
        }
        this.selectedButton = selectedButton;
      },
      (error) => {
        console.error('Erro ao carregar os produtos:', error);
      }
    );
  }
}
  