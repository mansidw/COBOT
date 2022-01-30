from django.shortcuts import render
from json import dumps
# Create your views here.
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
from django.http import HttpResponse
# Creating ChatBot Instance
chatbot = ChatBot('CoronaBot')
'''storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        'chatterbot.logic.MathematicalEvaluation',
        'chatterbot.logic.TimeLogicAdapter',
        'chatterbot.logic.BestMatch',
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, but I do not understand. I am still learning.',
            'maximum_similarity_threshold': 0.90
        }
    ],
    database_uri='sqlite:///database.sqlite3'
) '''

 # Training with Personal Ques & Ans 
conversation = [
    "Hello",
    "Hi there!",
    "How are you doing?",
    "I'm doing great.",
    "That is good to hear",
    "Thank you.",
    "You're welcome."
    "What is a coronavirus?"
    "Coronaviruses are a large family of viruses that are known to cause illness ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS)."
    "What is a novel coronavirus?"
    "A novel coronavirus (CoV) is a new strain of coronavirus that has not been previously identified in humans."
"Can humans become infected with a novel coronavirus of animal source?"
"Detailed investigations found that SARS-CoV was transmitted from civet cats to humans in China in 2002 and MERS-CoV from dromedary camels to humans in Saudi Arabia in 2012. Several known coronaviruses are circulating in animals that have not yet infected humans. As surveillance improves around the world, more coronaviruses are likely to be identified."
"What are the symptoms of someone infected with a coronavirus?"
"It depends on the virus, but common signs include respiratory symptoms, fever, cough, shortness of breath, and breathing difficulties. In more severe cases, infection can cause pneumonia, severe acute respiratory syndrome, kidney failure and even death."
"Can coronaviruses be transmitted from person to person?"
"Yes, some coronaviruses can be transmitted from person to person, usually after close contact with an infected patient, for example, in a household workplace, or health care centre."
"Is there a vaccine for a novel coronavirus?"
"When a disease is new, there is no vaccine until one is developed. It can take a number of years for a new vaccine to be developed."
"Is there a treatment for a novel coronavirus?"
"There is no specific treatment for disease caused by a novel coronavirus. However, many of the symptoms can be treated and therefore treatment based on the patient's clinical condition. Moreover, supportive care for infected persons can be highly effective."
"What can I do to protect myself?"
"Standard recommendations to reduce exposure to and transmission of a range of illnesses include maintaining basic hand and respiratory hygiene, and safe food practices  and avoiding close contact, when possible, with anyone showing symptoms of respiratory illness such as coughing and sneezing."
"Are health workers at risk from a novel coronavirus?"
"Yes, they can be, as health care workers come into contact with patients more often than the general public WHO recommends that health care workers consistently apply appropriate precaution"
"What WHO recommendations for countries?"
"WHO encourages all countries to enhance their surveillance for severe acute respiratory infections (SARI), to carefully review any unusual patterns of SARI or pneumonia cases and to notify WHO of any suspected or confirmed case of infection with novel coronavirus. Countries are encouraged to continue strengthening their preparedness for health emergencies in line with the International Health Regulations (2005)."
"Where can I find more information about known coronaviruses?"
"For more information on MERS-CoV http://www.emro.who.int/health-topics/mers-cov/index.html, For More information on SARS-CoV https://www.who.int/csr/sars/en/"
]


trainer = ListTrainer(chatbot)
trainer.train(conversation)

# Training with English Corpus Data 
'''trainer_corpus = ChatterBotCorpusTrainer(chatbot)
trainer_corpus.train(
    'chatterbot.corpus.english'
) '''

def covid_chatbot(request):
    userText = request.GET.get('msg')
    if userText == 'What is a coronavirus?':
        reply = "Coronaviruses are a large family of viruses that are known to cause illness ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS)."
    elif userText == 'Hi' or userText=='Hello':
        reply='Hi there!'
    elif userText == "Bye" or userText=="Exit":
        reply = 'Bye'
    elif userText == 'What is a novel coronavirus?':
        reply='A novel coronavirus (CoV) is a new strain of coronavirus that has not been previously identified in humans.'
    elif userText == 'What are the symptoms of coronavirus?':
        reply="It depends on the virus, but common signs include respiratory symptoms, fever, cough, shortness of breath, and breathing difficulties. In more severe cases, infection can cause pneumonia, severe acute respiratory syndrome, kidney failure and even death."
    elif userText == "Is there a treatment for coronavirus?":
        reply="There is no specific treatment for disease caused by a novel coronavirus. However, many of the symptoms can be treated and therefore treatment based on the patient's clinical condition. Moreover, supportive care for infected persons can be highly effective."
    elif userText == "What can I do to protect myself?":
        reply="Standard recommendations to reduce exposure to and transmission of a range of illnesses include maintaining basic hand and respiratory hygiene, and safe food practices  and avoiding close contact, when possible, with anyone showing symptoms of respiratory illness such as coughing and sneezing."

    else:
        reply='Sorry i dont understand'
    print(userText)
    print(chatbot.get_response(userText))
    dict1={
        'reply':str(chatbot.get_response(userText))
    }

    #new = dumps(dict1)
    print("Test")
    return HttpResponse(reply)

def home(request):
    return render(request,"index.html")