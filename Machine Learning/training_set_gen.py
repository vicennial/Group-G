'''
This Python Script Generates the Machine Learning Training Data Set scattered across Different CSV Files
and Puts it together in a Single CSV File for Future Use.

Python  : 3.6
Modules : Numpy, Pandas, Glob

'''

#Imports
import numpy as np
from pandas import read_csv
import glob

#No of Training Data
n = 315

#Training_Data
Data = np.zeros((n,7))
No_of_Training = int(n*0.7)					#70% as Training Set. Rest are Testing Data Set

#Path to Training Data
path 				= "data/c1/"
common_file_name 	= "c_1_"
fpath 				= path + common_file_name + "*.csv"

files 				= glob.glob(fpath)

i					= 0

if (files):
	print ("Parsing Files...")
else:
	print ("Files not Found!")
	quit()


#Read X Values and Compute Mean
for file in sorted(files):

	print ("Parsing File : ", file)
	
	#Read X Data
	Xdata = read_csv(file, header=None)
	Xdata = Xdata.values
	X = Xdata.mean(axis=0);					#Mean Along Coloumn (7 Vector)
	#print(X)
	Data[i, :] = X
	i = i + 1


#Read Y Data
Ydata = read_csv("data/c1_wear.csv")
Ydata = Ydata.values

Ydata = np.delete(Ydata, 0, 1)			#Remove the First Coloumn (n x 3)

Y = Ydata.mean(axis=1)					#Mean Along Row (n vector)

Data = np.c_[Data, np.zeros((n, 1))]

Data[:,7] = Y

#Save the Data as CSV File for Future Use
np.savetxt("C1_Data_Train.csv", Data[0:No_of_Training,:], delimiter=",")
np.savetxt("C1_Data_Test.csv",  Data[No_of_Training:n,:], delimiter=",")
