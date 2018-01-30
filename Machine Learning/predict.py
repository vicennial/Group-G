#Imports
import numpy as np
from pandas import read_csv
from sklearn.neighbors import KNeighborsRegressor


#No of Neighbors
no_of_neighbors = 3
Train_Data = "C1_Data_Train.csv"

#Training Data
Data = read_csv(Train_Data, header=None)
Data = Data.values


#Scikit - KNN Regressor
knn = KNeighborsRegressor(n_neighbors=no_of_neighbors, algorithm='auto')

print ("Training Data...")
knn.fit(Data [:,0:7], Data [:, 7])


#Input Parameters
Test = np.zeros((1,7));
for i in range(0,7):
	print ("#Input Paramter", i);
	t_str = input()
	Test[0,i] = float(t_str)


#Predictions
prediction = knn.predict(Test[:, 0:7])

print ("\n\n\n\nPredictions   : ", prediction)
