import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyOrdersList from '../my-orders-list';
import type { Order } from '@/services/myorders-service';
import { BrowserRouter } from 'react-router-dom';
const mockOrders: Order[] = [
    {
        "id": "67187641fe05c8b799026062",
        "userId": "1235",
        "parentOrderId": "ec346adf-bf00-469a-965b-29b95c3dd182",
        "orders": [
            {
                "context": {
                    "ttl": "PT10M",
                    "action": "confirm",
                    "timestamp": "2024-10-23T04:06:14.240Z",
                    "message_id": "5b439dc1-069c-43b5-a708-4244038539b3",
                    "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                    "domain": "Software Assurance",
                    "version": "1.1.0",
                    "bap_id": "bap.ossverse.com",
                    "bap_uri": "http://bap.ossverse.com",
                    "location": {
                        "country": {
                            "name": "India",
                            "code": "IND"
                        },
                        "city": {
                            "name": "Bengaluru",
                            "code": "std:080"
                        }
                    },
                    "bpp_id": "openfort-oasp.ossverse.com",
                    "bpp_uri": "http://openfort-oasp.ossverse.com"
                },
                "message": {
                    "context": {
                        "ttl": "PT10M",
                        "action": "confirm",
                        "timestamp": "2024-10-23T04:06:14.240Z",
                        "message_id": "5b439dc1-069c-43b5-a708-4244038539b3",
                        "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                        "domain": "Software Assurance",
                        "version": "1.1.0",
                        "bap_id": "bap.ossverse.com",
                        "bap_uri": "http://bap.ossverse.com",
                        "location": {
                            "country": {
                                "name": "India",
                                "code": "IND"
                            },
                            "city": {
                                "name": "Bengaluru",
                                "code": "std:080"
                            }
                        },
                        "bpp_id": "openfort-oasp.ossverse.com",
                        "bpp_uri": "http://openfort-oasp.ossverse.com"
                    },
                    "responses": [
                        {
                            "context": {
                                "domain": "Software Assurance",
                                "action": "on_status",
                                "version": "1.1.0",
                                "bpp_id": "openfort-oasp.ossverse.com",
                                "bpp_uri": "http://openfort-oasp.ossverse.com",
                                "location": {
                                    "country": {
                                        "name": "India",
                                        "code": "IND"
                                    },
                                    "city": {
                                        "name": "Bengaluru",
                                        "code": "std:080"
                                    }
                                },
                                "bap_id": "bap.ossverse.com",
                                "bap_uri": "http://bap.ossverse.com",
                                "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                                "message_id": "5b439dc1-069c-43b5-a708-4244038539b3",
                                "ttl": "PT10M",
                                "timestamp": "2024-10-24T08:34:36.013Z"
                            },
                            "message": {
                                "order": {
                                    "provider": {
                                        "id": "5fa5a7d6-895f-43a0-807e-1f7e85c35aa6",
                                        "locations": [
                                            {
                                                "country": {
                                                    "name": "India",
                                                    "code": "IND"
                                                },
                                                "city": {
                                                    "name": "Bengaluru",
                                                    "code": "std:080"
                                                }
                                            }
                                        ]
                                    },
                                    "state": "Completed Order",
                                    "items": [
                                        {
                                            "descriptor": {
                                                "name": "Management system"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "5000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Training",
                                            "description": "This is description of management system product",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "Management system"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "5000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Maintainance",
                                            "description": "This is description of management system product",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "Management system"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "5000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Hosting and Deployment",
                                            "description": "This is description of management system product",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "Management system"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "5000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "100% uptime",
                                            "description": "This is description of management system product",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ],
                                    "billing": {
                                        "tax_number": "22AAAAA0000A1Z5",
                                        "phone": "0987654321",
                                        "email": "openfort@example.com",
                                        "created_at": "2024-10-23T04:06:15.356Z",
                                        "updated_at": "2024-10-23T04:06:15.356Z"
                                    },
                                    "fulfillments": [],
                                    "quote": {
                                        "ttl": "P1D",
                                        "price": {
                                            "value": "20000",
                                            "currency": "INR"
                                        },
                                        "breakup": [
                                            {
                                                "item": {
                                                    currency: "INR",
                                                    value: "5000"
                                                },
                                                "price": {
                                                    "value": "5000",
                                                    "currency": "INR"
                                                },
                                                "title": "Management system",
                                                "@ondc/org/item_id": "652ddd69-5662-46f7-9bba-7202fb3e38bb",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    currency: "INR",
                                                    value: "5000"
                                                },
                                                "price": {
                                                    "value": "5000",
                                                    "currency": "INR"
                                                },
                                                "title": "Management system",
                                                "@ondc/org/item_id": "2fb88264-5e7f-4793-8b40-2398bdf658ed",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    currency: "INR",
                                                    value: "5000"
                                                },
                                                "price": {
                                                    "value": "5000",
                                                    "currency": "INR"
                                                },
                                                "title": "Management system",
                                                "@ondc/org/item_id": "2ba2e1d3-168e-4b9d-b8c0-6d657251f1a5",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    currency: "INR",
                                                    value: "5000"
                                                },
                                                "price": {
                                                    "value": "5000",
                                                    "currency": "INR"
                                                },
                                                "title": "Management system",
                                                "@ondc/org/item_id": "b9783cd2-83fa-4521-acb1-126852caecbd",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },

                                        ]
                                    },
                                    "payment": {
                                        "@ondc/org/settlement_details": [
                                            {
                                                "bank_name": "Bank of Springfield",
                                                "branch_name": "Main Branch",
                                                "settlement_type": "neft",
                                                "beneficiary_name": "openfort",
                                                "settlement_phase": "sale-amount",
                                                "settlement_ifsc_code": "IFSC0001234",
                                                "settlement_counterparty": "seller-app",
                                                "settlement_bank_account_no": "1234567890"
                                            }
                                        ],
                                        "@ondc/org/buyer_app_finder_fee_type": "Percent",
                                        "@ondc/org/buyer_app_finder_fee_amount": "3.0"
                                    },
                                    "id": "order-$2a$10$feCy.a.fRutm5wOrNxbSWO55BLNy2y8buZfN8xpK8mEFu6dZc76zu",
                                    "created_at": "2024-10-24T08:34:25.876Z",
                                    "updated_at": "2024-10-24T08:34:25.876Z",
                                    "type": "DEFAULT"
                                }
                            }
                        }
                    ]
                }
            }
        ],

    },
    {
        "id": "6718825efe05c8b799026076",
        "userId": "1235",
        "parentOrderId": "e70eafd9-6ff2-415a-b110-584b0c5bc2c6",
        "orders": [
            {
                "context": {
                    "ttl": "PT10M",
                    "action": "confirm",
                    "timestamp": "2024-10-23T04:57:55.519Z",
                    "message_id": "a3ffa9ef-76d2-4d3a-84dd-d46ae08a4cbd",
                    "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                    "domain": "Software Assurance",
                    "version": "1.1.0",
                    "bap_id": "bap.ossverse.com",
                    "bap_uri": "http://bap.ossverse.com",
                    "location": {
                        "country": {
                            "name": "India",
                            "code": "IND"
                        },
                        "city": {
                            "name": "Bengaluru",
                            "code": "std:080"
                        }
                    },
                    "bpp_id": "openfort-oasp.ossverse.com",
                    "bpp_uri": "http://openfort-oasp.ossverse.com"
                },
                "message": {
                    "context": {
                        "ttl": "PT10M",
                        "action": "confirm",
                        "timestamp": "2024-10-23T04:57:55.519Z",
                        "message_id": "a3ffa9ef-76d2-4d3a-84dd-d46ae08a4cbd",
                        "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                        "domain": "Software Assurance",
                        "version": "1.1.0",
                        "bap_id": "bap.ossverse.com",
                        "bap_uri": "http://bap.ossverse.com",
                        "location": {
                            "country": {
                                "name": "India",
                                "code": "IND"
                            },
                            "city": {
                                "name": "Bengaluru",
                                "code": "std:080"
                            }
                        },
                        "bpp_id": "openfort-oasp.ossverse.com",
                        "bpp_uri": "http://openfort-oasp.ossverse.com"
                    },
                    "responses": [
                        {
                            "context": {
                                "domain": "Software Assurance",
                                "action": "on_status",
                                "version": "1.1.0",
                                "bpp_id": "openfort-oasp.ossverse.com",
                                "bpp_uri": "http://openfort-oasp.ossverse.com",
                                "location": {
                                    "country": {
                                        "name": "India",
                                        "code": "IND"
                                    },
                                    "city": {
                                        "name": "Bengaluru",
                                        "code": "std:080"
                                    }
                                },
                                "bap_id": "bap.ossverse.com",
                                "bap_uri": "http://bap.ossverse.com",
                                "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                                "message_id": "a3ffa9ef-76d2-4d3a-84dd-d46ae08a4cbd",
                                "ttl": "PT10M",
                                "timestamp": "2024-10-24T08:34:36.012Z"
                            },
                            "message": {
                                "order": {
                                    "provider": {
                                        "id": "5fa5a7d6-895f-43a0-807e-1f7e85c35aa6",
                                        "locations": [
                                            {
                                                "country": {
                                                    "name": "India",
                                                    "code": "IND"
                                                },
                                                "city": {
                                                    "name": "Bengaluru",
                                                    "code": "std:080"
                                                }
                                            }
                                        ]
                                    },
                                    "state": "Completed Order",
                                    "items": [
                                        {
                                            "descriptor": {
                                                "name": "Language Model"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "5000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Higher context window",
                                            "description": "This is description of management system product",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "Language Model"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "5000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "multiple language models for backup",
                                            "description": "This is description of management system product",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ],
                                    "billing": {
                                        "tax_number": "22AAAAA0000A1Z5",
                                        "phone": "0987654321",
                                        "email": "openfort@example.com",
                                        "created_at": "2024-10-23T04:57:55.975Z",
                                        "updated_at": "2024-10-23T04:57:55.975Z"
                                    },
                                    "fulfillments": [],
                                    "quote": {
                                        "ttl": "P1D",
                                        "price": {
                                            "value": "10000",
                                            "currency": "INR"
                                        },
                                        "breakup": [
                                            {
                                                "item": {
                                                    currency: "INR",
                                                    value: "5000"
                                                },
                                                "price": {
                                                    "value": "5000",
                                                    "currency": "INR"
                                                },
                                                "title": "Language Model",
                                                "@ondc/org/item_id": "57262453-79aa-4dbb-ab72-91e65d2e6e9a",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    currency: "INR",
                                                    value: "5000"
                                                },
                                                "price": {
                                                    "value": "5000",
                                                    "currency": "INR"
                                                },
                                                "title": "Language Model",
                                                "@ondc/org/item_id": "9ec6b57a-bdbd-487b-97b4-c25c75e0793d",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },

                                        ]
                                    },
                                    "payment": {
                                        "@ondc/org/settlement_details": [
                                            {
                                                "bank_name": "Bank of Springfield",
                                                "branch_name": "Main Branch",
                                                "settlement_type": "neft",
                                                "beneficiary_name": "openfort",
                                                "settlement_phase": "sale-amount",
                                                "settlement_ifsc_code": "IFSC0001234",
                                                "settlement_counterparty": "seller-app",
                                                "settlement_bank_account_no": "1234567890"
                                            }
                                        ],
                                        "@ondc/org/buyer_app_finder_fee_type": "Percent",
                                        "@ondc/org/buyer_app_finder_fee_amount": "3.0"
                                    },
                                    "id": "order-$2a$10$1Mw0.7SI34LaszjMs08IXukKbPrkgVYEu.OylwDnMd.uN4L/WOBh2",
                                    "created_at": "2024-10-24T08:34:25.877Z",
                                    "updated_at": "2024-10-24T08:34:25.877Z",
                                    "type": "DEFAULT"
                                }
                            }
                        }
                    ]
                }
            }
        ],
    }]
describe('MyOrdersList', () => {
    it('should render the orders list', () => {
        render(
            <BrowserRouter>
                <MyOrdersList orders={mockOrders} showFilter={false} showGrid={false} />
            </BrowserRouter>
        );

        expect(screen.getByText('Management system')).toBeInTheDocument();
        expect(screen.getByText('DevOp Solution')).toBeInTheDocument();
    });

    it('should render "No orders found" when orders array is empty', () => {
        render(<MyOrdersList orders={[]} showFilter={false} showGrid={false} />);

        expect(screen.getByText('No orders found')).toBeInTheDocument();
    });
});
