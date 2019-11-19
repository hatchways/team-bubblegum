from datetime import date

class ReceiptController:

    def __init__(self, amount, title, receipt_date, pic_url,
                 category=None, date_created=date.today()):
        self.amount = amount
        self.title = title
        self.receipt_date = receipt_date
        self.pic_url = pic_url
        self.category = category
        self.date_created = date_created
