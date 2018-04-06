#Linear Regression
'''

 This Python Script performs BFGS (as default) Based Linear Regression

 Modules : Numpy, Scipy, Pandas

 Try Different Optimizing Algorithms to see which one works best. Different Choice include 
 * BFGS / L-BFGS-B / TNC / Nelder-Mead

 Author : Saptarshi Ghosh
 Email  : sghoshjr@gmail.com

'''

#Imports
import numpy as np 
import pandas as pd 
import scipy.optimize as op

#Constants
epoch = 10000
alpha = 0.001
regularization_param = 0

#Read CSV
X = pd.read_csv("C1_Data_Train.csv", header=None)
X = X.values


#Weight Matrix ()
Y = X[:, 7]
X = X[:,0:7]
W = np.zeros((X.shape[1]))

#Gradient Descent
m = X.shape[0]

#Cost History
JHistory = []

#Gradient
def fgrad(W_,X_,y_):
	h = (X_.dot(W_))
	error = h - y_
	grad = X.T.dot(error) / m
	return grad

#CostFunction
def fcost(W_,X_,y_):
	h = (X_.dot(W_))
	error = h - y_
	J = error.T.dot(error) / (2 * m)
	return J


#BFGS / L-BFGS-B / TNC / Nelder-Mead
Result = op.minimize(fun = fcost, 
								 x0 = W, 
                                 args = (X, Y),
                                 method = 'BFGS',
                                 jac = fgrad,
                                 options={'maxiter':1000, 'disp':True});

W = Result.x
y = X.dot(W)
print ("Cost Matrix : \n\n",  W)
print("\n\n\nOriginal Data Y : \n", Y)
print("\n\n\nFit Data : \n", y)

error = 0
for i in range(0, Y.shape[0]):
	error = error + (Y[i] - y[i])**2

error = error / Y.shape[0];
print("\n\n\n\nMean Squared Error : ", error)
