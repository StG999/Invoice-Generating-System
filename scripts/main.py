import openpyxl
from excelScript import createNewBill
from flask import Flask, request, send_file, make_response
from flask_cors import CORS

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
    
def api():
    app = Flask(__name__)
    CORS(app)
    
    @app.route('/generateBill', methods=['POST'])
    def handle_post():
        print('request:', request.json)
        data = request.json
        # 1. data contains the invoice
        # 2. extract values from data to get params from invoice
        # 3. create bill using the params
        # 4. convert the newBill.xslx to pdf
        # 5. send the pdf as response
        
        
        return make_response('Success', 200)

    if __name__ == '__main__':
        app.run(port=5000)

def main():
    invoiceNumber, date, customerName, customerAddress, items, grandTotal = extractValues()

    createNewBill(invoiceNumber, date, customerName, customerAddress, items, grandTotal)

api()
# main()