import requests
from email.message import EmailMessage
import smtplib #built in module which works on SMTP(SIMPLE MAIL TRANSFER PROTOCOL), to send emails.
from decouple import config #library to separate project-related/application’s settings parameters  from source code.


EMAIL = "riya.chinnu25@gmail.com"
PASSWORD = ""# I have to enter my google 'PassKey'

#IP ADDRESS
def find_my_ip():
    ip_address = requests.get('https://api.ipify.org?format=json').json()
    return ip_address["ip"]

#NEWS
def get_news():
    news_headlines = [] #newsapi.org
    result = requests.get(f"https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey"
                         f"=15eb8f2683024182b031ca55f7b3a8ad").json()
    articles = result["articles"]
    for article in articles:
        news_headlines.append(article["title"])
    return news_headlines[:5]

#WEATHER
def weather_forecast(city): #GET API VIA 'openweathermap'
    res = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid=4971e0525ec6e6772f336019e109726c").json()
    weather = res["weather"][0]["main"]
    temp = res["main"]["temp"]
    feels_like = res["main"]["feels_like"]
    return weather, f"{temp}°C", f"{feels_like}°C"
    
#EMAIL

def send_email(receiver_add, subject, message):
    try:
        email = EmailMessage()
        email['To'] = receiver_add
        email['Subject'] = subject
        email['From'] = EMAIL #Header fields of the email messaging
        
        email.set.content(message)
        s = smtplib.SMTP("smtp.gmail.com", 587) #587 is a secure standard port for secure email transmission
        s.starttls() # tls used for encryption of our message
        s.login(EMAIL, PASSWORD)
        s.send_message(email)
        s.close()
        return True
    except Exception as e:
        print(e)
        return False