import os
import requests  # for making HTTP requests to APIs
import pyttsx3  # for converting text to speech
import speech_recognition as sr  # for converting speech to text
import datetime  # for working with dates and times
import wikipedia
import pywhatkit  # for interacting with WhatsApp
import pyautogui  # for controlling the mouse and keyboard
import pyjokes  # for generating jokes
import wolframalpha # for general information
from online import find_my_ip, get_news, weather_forecast, send_email

# uvicorn main:app --reload
# FASTAPI: This suggests a potential future direction for making VIWA accessible through a web interface.
from fastapi import FastAPI

app = FastAPI()

@app.get("/voiceinput")
async def root():  # root() function is used when running VIWA as a web API (currently commented out).
    return {"message": "Connected to VIWA."}

# This function takes text as input and uses pyttsx3 to speak it aloud.
engine = pyttsx3.init('sapi5')  # variable created called engine, sapi5 is a voice recognition provided by microsoft

# RATE
rate = engine.getProperty('rate')  # getting details of current speaking rate
print(rate)  # printing current voice rate
engine.setProperty('rate', 200)  # setting up new voice rate

# VOLUME
volume = engine.getProperty('volume')  # getting to know current volume level (min=0 and max=1)
print(volume)  # printing current volume level
engine.setProperty('volume', 1.0)  # setting up volume level  between 0 and 1

# VOICE
voices = engine.getProperty('voices')  # getting details of current voice
# engine.setProperty('voice', voices[0].id)  # changing index, changes voices. o for male
engine.setProperty('voice', voices[2].id)  # changing index, changes voices. 1 for female

# print('DAVID: ' + voices[0].name)
# print('HAZEL: ' + voices[1].name)
print('ZIRA: ' + voices[2].name)

def speak(audio):  # used a variable called speak
    engine.say(audio)
    engine.runAndWait()  # it gets an input as a text and output as audio

speak("Hello, I am Viwa! How can I assist you today?")

# Function to get input from microphone
def commands():  # is designed to capture voice input from a user, convert it to text, and return the text.
    r = sr.Recognizer()  # creates an instance of the Recognizer class from the speech_recognition library. This class is responsible for recognizing speech.
    with sr.Microphone() as source:  # opens the microphone on the computer as the source of the audio input.
        print("Listening....")
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source, duration=1)
        audio = r.listen(source)  # captures the audio input from the microphone.
        
    try:  # if (query) API line crashes the Exception function prevents the error
        print("Wait For Few Moments....")
        query = r.recognize_google(audio, language='en-in')  # uses Google's speech recognition API to convert the audio input to text.
        print(f"You just said: {query} \n")
        return query  # Return the recognized text
    except Exception as e:
        print(e)
        print("Please tell me again")
        return "none"

# Greetings function based on the date and time
def wishings():
    results = ""
    hour = int(datetime.datetime.now().hour)
    if hour >= 0 and hour < 12:
        print("Good Morning Riya")
        speak("Good Morning Riya")
    elif hour >= 12 and hour < 17:
        print("Good Afternoon Riya")
        speak("Good Afternoon Riya")
    elif hour >= 17 and hour < 21:
        print("Good Evening Riya")
        speak("Good Evening Riya")
    else:
        print("Good Night Riya")
        speak("Good Night Riya")
        
if __name__ == "__main__":  # adding the wishings function to our main
    wishings()
    while True:
        query = commands().lower()
        
        if 'time' in query:  # Function to tell us the current time
            strTime = datetime.datetime.now().strftime("%H:%M:%S")
            print(strTime)
            speak(f"Riya, the time is {strTime}")
        
        elif 'wikipedia' in query:
            speak("Searching In Wikipedia...") 
            try:
                query = query.replace("wikipedia", "")
                results = wikipedia.summary(query, sentences=1)
                speak("According to Wikipedia, ")
                print(results)
                speak(results)
            except:
                speak("No results found...")
                print("No results found...")

        #------IP ADDRESS--------
        elif "ip address" in query:
            speak("Getting your IP address Riya")
            ip_address = find_my_ip()
            speak(f"Your IP address is {ip_address}")  
            print(f"Your IP address is {ip_address}")       
            results = ip_address
            query = ""

        #----WEATHER FUNCTION--------
        elif any(word in query for word in ["weather", "today's weather", "weather report"]):
            ip_address = find_my_ip()
            speak(f"Tell me the name of your City")
            city = input("Enter your city: ")  # https://ipapi.co
            speak(f"Getting weather report of your city {city}")
            weather, temp, feels_like = weather_forecast(city)
            speak(f"The current temperature is {temp}, but it feels like {feels_like}")
            speak(f"Also, the weather report talks about {weather}")
            speak(f"For your convenience, I am printing it on the screen Riya.")
            print(f"Description: {weather}\nTemperature: {temp}\nFeels Like: {feels_like}")
            query = ""
            
        #------CALCULATOR---
        elif "calculate" in query:
            app_id = "VVJU7R-XQJJ88PTHG"
            client = wolframalpha.Client(app_id)
            ind = query.lower().split().index("calculate")
            text = query.split()[ind + 1:]
            result = client.query(" ".join(text))
            try:
                ans = next(result.results).text
                speak("The answer is: " + ans)
                print("The answer is: " + ans)
            except StopIteration:
                speak("I am not able to answer your question Riya")
                print("I am not able to answer your question Riya")
            
        #------GENERAL QUESTIONS----
        elif any(phrase in query for phrase in ["what is", "who is", "which is"]):
            app_id = "VVJU7R-XQJJ88PTHG"
            client = wolframalpha.Client(app_id)
            try:
                ind = query.lower().index('what is') if 'what is' in query.lower() else \
                    query.lower().index('who is') if 'who is' in query.lower() else \
                    query.lower().index('which is') if 'which is' in query.lower() else None
                    
                if ind is not None:
                    text = query.split()[ind+2:]
                    result = client.query("".join(text))
                    ans = next(result.results).text 
                    speak("The answer is: " + ans)   
                    print("The answer is: " + ans)   
                else:
                    speak("I could not find that")
            except StopIteration:
                speak("I could not find that, please try again")                               
                print("I could not find that, please try again")
        
        #MAGIC SENTENCES   
        elif "magic sentence" in query:
            speak('I hope I impressed you all!')
        
        elif "what can you do for me" in query:
            speak('Yes Riya, Nice question')
            speak('As per my program, I\'m a Virtual AI Assistant which can perform tasks through your voice commands')
        
        elif any(word in query for word in ["cool", "nice", "thank you"]):
            speak('You are welcome Riya, its my pleasure!')
        
        elif any(word in query for word in ["minimize", "minimise"]):
            speak('Minimising Riya...')
            pyautogui.hotkey('win', 'down', 'down')
        
        elif any(word in query for word in ["maximize", "maximise"]):
            speak('Maximising Riya...')
            pyautogui.hotkey('win', 'up', 'up')
        
        elif any(word in query for word in ["close the window", "close the application"]):
            speak('closing Riya')
            pyautogui.hotkey('ctrl', 'w')
        
        elif "screenshot" in query:
            speak("Taking Screenshot Riya......")
            pyautogui.press('prtsc')
        
        # Play YouTube Video
        elif 'play' in query:
            query = query.replace('play', '')
            speak('Playing ' + query)
            pywhatkit.playonyt(query)
        
        # Making VIWA do jokes
        elif 'joke' in query:
            joke = pyjokes.get_joke()
            print(joke)
            speak(joke)
        
        #------NEWS FUNCTION--------
        elif "news headlines" in query or "give me news" in query or "news" in query:
            news_headlines = get_news()
            speak(f"I am reading out the latest headlines of today, Riya")
            speak(get_news())
            speak("I am printing it on screen Riya")
            print(*get_news(), sep='\n')
            
        #------EMAIL FUNCTION--------
        # elif "send an email" in query:
        #     speak("On what email address do you want to send Riya? Please type the email address")
        #     receiver_add = input("Email Address: ")
        #     speak("What should be the subject Riya?")
        #     subject = take_command().capitalize()
        #     speak("What is the message Riya?")
        #     message = take_command().capitalize()
        #     if send_email(receiver_add, subject, message):
        #         speak("Email has been sent Riya")
        #         print("Email has been sent Riya")
        #     else:
        #         speak("Email has not been sent Riya")
        #         print("Email has not been sent Riya")
        
        elif 'exit' in query:
            speak("I'm leaving Riya, Bye!")
            quit()
        
        elif 'info about' in query:
            infoQuery = query.replace('info about', '')
            speak("Getting info")
            try:
                resInfo = pywhatkit.info(infoQuery, lines=2)
                print(resInfo)
                speak(resInfo)
            except:
                speak("...")
