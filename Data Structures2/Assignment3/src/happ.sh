#!/bin/bash

file='SampleData.csv'

# Linear
java HashApp "653" "Linear" "d.csv" "500" > $file

java HashApp "751" "Linear" "d.csv" "500">> $file
  
java HashApp "769" "Linear" "d.csv" "500">> $file
 
java HashApp "797" "Linear" "d.csv" "500" >> $file

java HashApp "809" "Linear" "d.csv" "500">> $file
 
java HashApp "839" "Linear" "d.csv" "500">> $file

java HashApp "887" "Linear" "d.csv" "500">> $file

java HashApp "911" "Linear" "d.csv" "500">> $file

java HashApp "967" "Linear" "d.csv" "500">> $file

java HashApp "1009" "Linear" "d.csv" "500">> $file 

# Quadratic

java HashApp "677" "Quadratic" "d.csv" "500">> $file

java HashApp "751" "Quadratic" "d.csv" "500">> $file

java HashApp "769" "Quadratic" "d.csv" "500">> $file

java HashApp "797" "Quadratic" "d.csv" "500">> $file

java HashApp "809" "Quadratic" "d.csv" "500">> $file
 
java HashApp "839" "Quadratic" "d.csv" "500">> $file

java HashApp "887" "Quadratic" "d.csv" "500">> $file

java HashApp "911" "Quadratic" "d.csv" "500">> $file

java HashApp "967" "Quadratic" "d.csv" "500">> $file

java HashApp "1009" "Quadratic" "d.csv" "500">> $file 

# Chaining

java HashApp "653" "Chaining" "d.csv" "500" >> $file

java HashApp "751" "Chaining" "d.csv" "500">> $file
  
java HashApp "769" "Chaining" "d.csv" "500">> $file
 
java HashApp "797" "Chaining" "d.csv" "500">> $file

java HashApp "809" "Chaining" "d.csv" "500">> $file
 
java HashApp "839" "Chaining" "d.csv" "500">> $file

java HashApp "887" "Chaining" "d.csv" "500">> $file

java HashApp "911" "Chaining" "d.csv" "500">> $file

java HashApp "967" "Chaining" "d.csv" "500">> $file

java HashApp "1009" "Chaining" "d.csv" "500">> $file 
