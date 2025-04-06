type Product = {
    id?: string;
    _id?: { $oid?: string };
    vendor?: { name?: string };
    series?: { name?: string; item_quantity?: number };
    description_details?: {
      en?: {
        fabric?: string;
        model_measurements?: string;
        product_measurements?: string;
        sample_size?: string;
      };
    };
    main_image?: string;
    price?: number;
    names?: { en?: string };
    images?: string[];
    product_code?: string;
  };