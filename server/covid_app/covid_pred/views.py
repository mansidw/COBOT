from django.shortcuts import render
# Create your views here.
import numpy as np
import pickle
#import pandas as pd
from django.http import HttpResponse
import pandas
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class predict(APIView):

    def post(self,request):
        #symptoms = request.POST.getlist('symptoms[]')
        symptoms = request.data.get('symptoms')
        print (symptoms)
        final = []
        final.append(symptoms)
        knn_from_pickle = pickle.load(open('model.pkl','rb'))
        arr = np.array(final)

        df = pandas.DataFrame(arr,columns=['Breathing Problem','Fever','Dry Cough','Sore throat','Hyper Tension','Abroad travel','Contact with COVID Patient','Attended Large Gathering','Visited Public Exposed Places','Family working in Public Exposed Places'])
        # Use the loaded pickled model to make predictions
        result = knn_from_pickle.predict(df)
        print(result)
        if result[0]==1:
            covid_status = 'Positive'
        else:
            covid_status = 'Negative'

        return Response({'covid_status':covid_status},status=status.HTTP_200_OK)
