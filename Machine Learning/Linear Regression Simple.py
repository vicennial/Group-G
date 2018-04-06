#Linear Regression
'''

 This Python Script performs Gradient Descent Linear Regression

 Modules : Numpy, Matplotlib, Pandas

 Set Different Values for #Constants such as epoch, alpha (step size), regularization Parameter to obtain suitable results

 Author : Saptarshi Ghosh
 Email  : sghoshjr@gmail.com

'''

#Imports
import numpy as np 
import matplotlib.pyplot as plt 
import pandas as pd 

#Constants
epoch = 10000
alpha = 0.001
regularization_param = -10


#Read CSV
X = pd.read_csv("C1_Data_Train.csv", header=None)
X = X.values


#Weight Matrix ()
Y = X[:, 7]
X = X[:,0:7]
W = np.random.uniform(size=(X.shape[1],))
#W = np.zeros((X.shape[1]))						#Alternative to random


#Gradient Descent
m = X.shape[0]

#Cost History
JHistory = []

for epc in np.arange(0, epoch):
	h = X.dot(W)
	error = h - Y
	grad = X.T.dot(error) / m
	J = error.T.dot(error) / (2 * m)
	JHistory.append(J)
	print(epc+1, ": epoch :: J : ", J, "    W: ", W)
	W = W*(1 - alpha * regularization_param / m) - alpha*grad

y = X.dot(W)

#print("Final Fit : ", W)
#print("Original Data : \n", X)
print("Original Data Y : \n", Y)
print("Fit Data : \n", y)

error = 0
for i in range(0, Y.shape[0]):
	error = error + (Y[i] - y[i])**2

error = error / Y.shape[0];
print("Mean Squared Error : ", error)


#Plot J vs Epoch#
fig = plt.figure()
plt.plot(np.arange(0, epoch), JHistory)
fig.suptitle("Training Loss")
plt.xlabel("Epoch #")
plt.ylabel("Loss")


#Display
plt.show()