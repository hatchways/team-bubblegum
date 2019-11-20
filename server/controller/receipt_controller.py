from datetime import date

class ReceiptController:

    def __init__(self, model, view):
        self.model = model
        self.view = view

    def create_receipt(self, amount, title, receipt_date, pic_url,
                       category=None, date_created=date.today()):
        self.model.create_receipt(amount, title, receipt_date, pic_url,
                                  category, date_created)
