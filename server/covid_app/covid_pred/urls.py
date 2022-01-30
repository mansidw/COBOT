from django.urls import	path
from . import views
app_name =	'covid_pred'

urlpatterns = [
path('predict',views.predict.as_view(),name='covid_predict'),
]