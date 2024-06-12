import openpyxl
from excelScript import createNewBill

def placeholderValues():
    # Input Values BEGIN -----------
    return {
        'invoiceNumber': '001',
        'date': "2003-07-30",
        'customerName': 'John Doe',
        'customerAddress': '1234 Elm Street',
        'items': [
            {
                'name': 'Item 1',
                'packaging': '100gm',
                'quantity': 2,
                'rate': 69
            },
            {
                'name': 'Item 2',
                'packaging': '1pc',
                'quantity': 3,
                'rate': 99
            },
            {
                'name': 'Item 3',
                'packaging': '10pc',
                'quantity': 2,
                'rate': 26
            }
        ],
        'grandTotal': 1234.56,
    }
    
def extractValues():
    invoice = placeholderValues()
    invoiceNumber = invoice['invoiceNumber']
    date = invoice['date']
    customerName = invoice['customerName']
    customerAddress = invoice['customerAddress']
    items = invoice['items']
    grandTotal = invoice['grandTotal']
    
    return invoiceNumber, date, customerName, customerAddress, items, grandTotal
    
def main():
    invoiceNumber, date, customerName, customerAddress, items, grandTotal = extractValues()

    createNewBill(invoiceNumber, date, customerName, customerAddress, items, grandTotal)

main()