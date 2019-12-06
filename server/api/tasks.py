import api.users as usr
import api.emails as eml

def send_monthly_overview_emails():
    all_users = usr.get_all_users().json['users']
    for user in all_users:
        user_id = user['id']
        user_email = user['email']
        eml.end_of_month_overview(user_id, user_email)
