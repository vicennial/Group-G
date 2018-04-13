# This readme describes the functionality of different Python Scripts

* ## Linear Regression 
    This uses BFGS (by default) to optimize the Regression Cost Function, and is faster than the simple Gradient Descent Algorithm.

* ## Linear Regression (Simple)
    This implements a iterative gradient descent with a given epoch, a gradient descent parameter (alpha) and regularization parameter.
    This is often very slow and is good to see if the Cost Function is converging or not.

* ## KNN
    This utilizes the K-Nearest Neighbour Algorithm to predict the output. It cannot predict good values if the given input parameter is too different from the data it was trained.

* ## Training Set Generator
    This creates CSV Files from the given data set (combination of multiple folders/files) which can be used for training/testing the above Predictors.
  
  It creates two CSV Files,

  70% of data is for training purpose.
  
  30% of data is for testing purpose.


