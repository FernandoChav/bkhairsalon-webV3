import { ServiceResponse } from '../responses';

export interface CartItem extends ServiceResponse {
  cartId: string;
}
