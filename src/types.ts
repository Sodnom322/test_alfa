

type Rating = {
    rate:number,
    count:number
}

export interface IProduct {
    id:number,
    title:string,
    price:number,
    description:number,
    category:string,
    image:string,
    rating?:Rating,
}

export interface IProductClick extends IProduct{
    onClick:() => void;
    onToggleFavorite:() => void;
    isFavorite:boolean

}

export interface ProductsState {
    items: IProduct[];
    favorites: number[];
    isLoading: boolean;
    error: string | null;
    currentPage: number, 
    itemsPerPage: number, 
    sortOrder:string
  }
  