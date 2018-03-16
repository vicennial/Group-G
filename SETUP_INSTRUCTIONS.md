## Setup Instructions

### 1. Install [Node.JS](https://nodejs.org/en/)

- Download and Install Node.js for your Operating System.
- Make sure to add node.js to system variables
- Install npm

----

### 2. Clone the Repository
- Clone and Download this Repository and unzip

---
### 3. Running the Web server

#### Local Server
- Open Terminal and Navigate to `~/website/`
- Run `npm install`
- Run `node app.js`
- Leave the Terminal Open

#### ISW Server
- Open another Terminal and Navigate to `~/website/`
- Run `node server.js`

---
### 4. Open the webpage

- Navigate to `http://localhost:3500/` in browser

---
### 5. Machine Learning Prediction

- Install Python 3 (in system environment) with following Modules :
	- Numpy
	- Pandas
	- Scikit-Learn
	- Glob
	
#### Training Set Generator
- Training Data is expected in `data/c1`
- Modify `#Path to Training Data (ln 22)` as needed.

#### Predict
- Modify `Train_Data` to point to Training Data (csv)
- Enter the Input Parameters

#### Prediction from ISW Server
- Navigate to `http://localhost:3100/send`
- This Sends the Input Parameter to local Server
- The Corresponding Prediction is echoed in the Terminal window.
