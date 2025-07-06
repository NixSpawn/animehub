export interface CartItem {
    id: string;
    title: string;
    quantity: number;
    price: number;
    description?: string;
    picture_url?: string;
  }
  
  export interface PreferenceRequest {
    items: CartItem[];
    paymentMethod?: 'yape' | 'plin' | 'card' | 'all';
  }
  
  export interface PreferenceResponse {
    id: string;
    init_point: string;
    sandbox_init_point: string;
  }
  
  export interface PaymentNotification {
    id: number;
    live_mode: boolean;
    type: string;
    date_created: string;
    application_id: number;
    user_id: number;
    version: number;
    api_version: string;
    action: string;
    data: {
      id: string;
    };
  }
  
  export interface PaymentStatus {
    id: string;
    status: 'pending' | 'approved' | 'authorized' | 'in_process' | 'in_mediation' | 'rejected' | 'cancelled' | 'refunded' | 'charged_back';
    status_detail: string;
    transaction_amount: number;
    currency_id: string;
    payment_method_id: string;
    external_reference?: string;
  }
  
  export type PaymentMethod = 'yape' | 'plin' | 'card' | 'all';