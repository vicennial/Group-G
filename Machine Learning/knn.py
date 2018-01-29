'''
This Python Script uses Scikit-Learn's KNeighborsRegressor for Regression and
calculates the Mean Squared Error

Python  : 3.6
Modules : Pandas, Scikit-learn

'''

#Imports
import numpy as np
from pandas import read_csv
from sklearn.neighbors import KNeighborsRegressor


#No of Neighbors
no_of_neighbors = 3
Train_Data = "C1_Data_Train.csv"
Test_Data  = "C1_Data_Test.csv"


#Training Data
Data = read_csv(Train_Data, header=None)
Data = Data.values


#Scikit - KNN Regressor
knn = KNeighborsRegressor(n_neighbors=no_of_neighbors, algorithm='auto')

print ("Training Data...")
knn.fit(Data [:,0:7], Data [:, 7])


#Test Data
print ("Test Data...")
Test = read_csv(Test_Data, header=None)
Test = Test.values

#Predictions
y = Test[:, 7]
prediction = knn.predict(Test[:, 0:7])

print ("Actual Output : ", y)
print ("\n\n\n\nPredictions   : ", prediction)

# Error = (1/n) * Sigma ( (y - y')^2 )
Mean_Sq_Error =  (((prediction - y)**2).sum()) / len(prediction)

print("Mean Squared Error : ", Mean_Sq_Error)